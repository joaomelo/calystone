import type {
  Artifact,
  ArtifactOptions,
  Directory,
  DirectoryOptions,
  Node,
  Nodes
} from "@/domain";

import { createId } from "@/domain";
import {
  LoggerContainer,
  Status,
  throwCritical,
  Tracker
} from "@/utils";

import type { ArtifactOrDirectoryOptions } from "../file-system";

import { BaseFileSystemAdapter } from "../base";

interface DirectoryMetadata {
  handle: FileSystemDirectoryHandle,
  parentHandle?: FileSystemDirectoryHandle;
}
interface FileMetadata {
  handle: FileSystemFileHandle;
  parentHandle: FileSystemDirectoryHandle;
}

export class FsaFileSystemAdapter extends BaseFileSystemAdapter<DirectoryMetadata, FileMetadata> {
  private readonly getFilesTracker = new Tracker("open-directory__get-file");
  private readonly handleValuesTracker = new Tracker("open-directory__handle-values");

  constructor(options: {
    nodes: Nodes;
    rootHandle: FileSystemDirectoryHandle
  }) {
    const {
      nodes,
      rootHandle
    } = options;
    const rootOptions: DirectoryOptions = {
      id: createId(),
      name: rootHandle.name,
      parentId: undefined
    };
    const rootMetadata: DirectoryMetadata = {
      handle: rootHandle,
      parentHandle: undefined
    };
    super({
      nodes,
      rootMetadata,
      rootOptions
    });
  }

  async createArtifact(options: {
    name: string,
    parent: Directory
  }): Promise<ArtifactOptions> {
    const {
      name,
      parent: { id: parentId }
    } = options;
    const id = createId();

    const parentMetadata = this.metadatas.getOfDirectoryOrThrow(parentId);
    const { metadata: { handle: parentHandle } } = parentMetadata;
    const newFileHandle = await parentHandle.getFileHandle(name, { create: true });
    const writableStream = await newFileHandle.createWritable();
    await writableStream.close();

    const fileMetadata: FileMetadata = {
      handle: newFileHandle,
      parentHandle,
    };
    this.metadatas.setFile({
      id,
      metadata: fileMetadata
    });

    const {
      lastModified,
      size
    } = await newFileHandle.getFile();
    const data: ArtifactOptions = {
      id,
      lastModified,
      name,
      parentId,
      size,
    };

    return data;
  }

  async createDirectory(options: {
    name: string,
    parent: Directory
  }): Promise<DirectoryOptions> {
    const {
      name,
      parent: { id: parentId }
    } = options;
    const id = createId();

    const { metadata: { handle: parentHandle } } = this.metadatas.getOfDirectoryOrThrow(parentId);
    const newDirectoryHandle = await parentHandle.getDirectoryHandle(name, { create: true });

    const directoryMetadata: DirectoryMetadata = {
      handle: newDirectoryHandle,
      parentHandle: parentHandle
    };

    this.metadatas.setDirectory({
      id,
      metadata: directoryMetadata
    });

    const data: DirectoryOptions = {
      id,
      name,
      parentId
    };
    return data;
  }

  async fetchContent(artifact: Artifact): Promise<ArrayBuffer> {
    const { metadata: { handle } } = this.metadatas.getOfFileOrThrow(artifact.id);
    const file: File = await handle.getFile();
    const content: ArrayBuffer = await file.arrayBuffer();
    return content;
  }

  async move(options: {
    subject: Node;
    target: Directory
  }): Promise<void> {
    const {
      subject,
      target
    } = options;

    this.moveable(subject).throwOnFail();

    const { metadata: fileMetadata } = this.metadatas.getOfFileOrThrow(subject.id);
    const {
      handle: oldHandle,
      parentHandle: oldParentHandle
    } = fileMetadata;
    const { metadata: { handle: newParentHandle } } = this.metadatas.getOfDirectoryOrThrow(target.id);

    const newFileHandle = await newParentHandle.getFileHandle(subject.name, { create: true });
    await this.copyFileContent({
      source: oldHandle,
      target: newFileHandle
    });
    await oldParentHandle.removeEntry(oldHandle.name);

    const newMetadata = {
      ...fileMetadata,
      handle: newFileHandle,
      parentHandle: newParentHandle
    };
    this.metadatas.setFile({
      id: subject.id,
      metadata: newMetadata
    });
  }

  moveable(subject: Node) {
    const rootStatus = this.failIfRoot(subject);
    if (rootStatus.isFail()) return rootStatus;

    const directoryStatus = this.failIfDirectory(subject);
    if (directoryStatus.isFail()) return directoryStatus;

    return Status.ok();
  }

  async open(parent: Directory): Promise<ArtifactOrDirectoryOptions[]> {
    const { metadata: { handle } } = this.metadatas.getOfDirectoryOrThrow(parent.id);
    const childrenData: ArtifactOrDirectoryOptions[] = [];

    let handleValuesMark = this.handleValuesTracker.record();

    for await (const childHandle of handle.values()) {
      handleValuesMark();

      const {
        kind,
        name
      } = childHandle;
      const childId = createId();

      if (kind === "file") {
        const getFilesMark = this.getFilesTracker.record();
        const {
          lastModified,
          size
        } = await childHandle.getFile();
        getFilesMark();

        const childData: ArtifactOptions = {
          id: childId,
          lastModified,
          name,
          parentId: parent.id,
          size,
        };
        const childMetadata: FileMetadata = {
          handle: childHandle,
          parentHandle: handle,
        };
        this.metadatas.setFile({
          id: childId,
          metadata: childMetadata
        });
        childrenData.push(childData);
        continue;
      }

      const childData: DirectoryOptions = {
        id: childId,
        name,
        parentId: parent.id,
      };
      const childMetadata: DirectoryMetadata = {
        handle: childHandle,
        parentHandle: handle,
      };
      this.metadatas.setDirectory({
        id: childId,
        metadata: childMetadata
      });
      childrenData.push(childData);

      handleValuesMark = this.handleValuesTracker.record();
    }

    const logger = LoggerContainer.use();
    logger.debug(this.handleValuesTracker.summary());
    logger.debug(this.getFilesTracker.summary());

    return childrenData;
  }

  async postContent(artifact: Artifact): Promise<void> {
    const { metadata: { handle } } = this.metadatas.getOfFileOrThrow(artifact.id);
    const writableStream = await handle.createWritable();
    await writableStream.write(artifact.toBinary());
    await writableStream.close();
  }

  async remove(node: Node): Promise<void> {
    const removeable = this.removeable(node);
    removeable.throwOnFail();

    const {
      kind,
      metadata: { parentHandle }
    } = this.metadatas.getOrThrow(node.id);
    if (!parentHandle) throwCritical("CANNOT_REMOVE_ROOT");

    if (kind === "directory") {
      await parentHandle.removeEntry(node.name, { recursive: true });
    } else {
      await parentHandle.removeEntry(node.name);
    }

    this.metadatas.remove(node);
  }

  removeable(node: Node) {
    return this.failIfRoot(node);
  }

  async rename(options: {
    name: string;
    node: Node,
  }): Promise<void> {
    const {
      name,
      node: { id }
    } = options;

    const { metadata: fileMetadata } = this.metadatas.getOfFileOrThrow(id);
    const {
      handle: oldHandle,
      parentHandle
    } = fileMetadata;

    const oldName = oldHandle.name;
    if (name === oldName) return;

    const newFileHandle = await parentHandle.getFileHandle(name, { create: true });
    await this.copyFileContent({
      source: oldHandle,
      target: newFileHandle
    });
    await parentHandle.removeEntry(oldName);

    const newMetadata = {
      ...fileMetadata,
      handle: newFileHandle
    };
    this.metadatas.setFile({
      id,
      metadata: newMetadata
    });
  }

  renameable(node: Node) {
    return this.failIfDirectory(node);
  }

  private async copyFileContent(options: {
    source: FileSystemFileHandle,
    target: FileSystemFileHandle
  } ): Promise<void> {
    const {
      source,
      target
    } = options;
    const sourceFile = await source.getFile();
    const content = await sourceFile.arrayBuffer();
    const writable = await target.createWritable();
    await writable.write(content);
    await writable.close();
  }

}
