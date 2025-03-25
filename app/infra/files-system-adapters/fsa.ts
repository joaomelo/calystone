import type { DirectoryDataOptions, Id, Node } from "@/domain";

import { createId } from "@/domain";
import { throwCritical, throwNull } from "@/utils";

import type { ArtifactOrDirectoryDataOptions } from "./file-system";

import { BaseFileSystemAdapter } from "./base";

interface DirecotryRootMetadata {
  handle: FileSystemDirectoryHandle,
  kind: "directory"
  parentHandle: undefined;
}
interface DirectoryMetadata {
  handle: FileSystemDirectoryHandle,
  kind: "directory"
  parentHandle: FileSystemDirectoryHandle;
}
interface FileMetadata {
  kind: "file";
  handle: FileSystemFileHandle;
  parentHandle: FileSystemDirectoryHandle;
}
type NodeMetadata = DirecotryRootMetadata | DirectoryMetadata | FileMetadata;

export class FsaFileSystemAdapter extends BaseFileSystemAdapter<NodeMetadata> {
  constructor(rootHandle: FileSystemDirectoryHandle) {
    const rootData: DirectoryDataOptions = {
      id: createId(),
      name: rootHandle.name,
      parentId: undefined
    };
    const rootMetadata: DirecotryRootMetadata = {
      handle: rootHandle,
      kind: "directory",
      parentHandle: undefined
    };
    super({ rootData, rootMetadata });
  }

  async fetchFileContent(id: Id): Promise<ArrayBuffer> {
    const { handle } = this.metadataOfFileOrThrow(id);
    const file: File = await handle.getFile();
    const content: ArrayBuffer = await file.arrayBuffer();
    return content;
  }

  moveNode(): Promise<void> {
    throwNull();
  }

  async openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]> {
    const { handle } = this.metadataOfDirectoryOrThrow(id);
    const childrenData: ArtifactOrDirectoryDataOptions[] = [];

    for await (const childHandle of handle.values()) {
      const { kind, name } = childHandle;
      const childId = createId();

      let childData: ArtifactOrDirectoryDataOptions;
      let childMetadata: DirectoryMetadata | FileMetadata;
      if (kind === "file") {
        const { lastModified, size } = await childHandle.getFile();
        childData = {
          id: childId,
          lastModified,
          name,
          parentId: id,
          size,
        };
        childMetadata = {
          handle: childHandle,
          kind,
          parentHandle: handle,
        };
      } else {
        childData = {
          id: childId,
          name,
          parentId: id,
        };
        childMetadata = {
          handle: childHandle,
          kind,
          parentHandle: handle,
        };
      }
      this.nodesMetadata.set(childId, childMetadata);
      childrenData.push(childData);
    }
    return childrenData;
  }

  async postFileContent({ content, id }: { content: ArrayBuffer; id: Id, }): Promise<void> {
    const { handle } = this.metadataOfFileOrThrow(id);
    const writableStream = await handle.createWritable();
    await writableStream.write(content);
    await writableStream.close();
  }

  async removeNode(node: Node): Promise<void> {
    const { kind, parentHandle } = this.metadataOrThrow(node.id);

    if (node.isRoot() || !parentHandle) {
      throwCritical("CANNOT_REMOVE_ROOT", "cannot remove the root node");
    }

    if (kind === "directory") {
      await parentHandle.removeEntry(node.name, { recursive: true });
    } else {
      await parentHandle.removeEntry(node.name);
    }

    this.removeMetadata(node);
  }

  async renameNode(options: { id: Id, name: string }): Promise<void> {
    const { id, name } = options;

    const fileMetadata = this.metadataOfFileOrThrow(id);
    const { handle: oldHandle, parentHandle } = fileMetadata;

    const oldName = oldHandle.name;
    if (name === oldName) return;

    const newFileHandle = await parentHandle.getFileHandle(name, { create: true });

    const oldFile = await oldHandle.getFile();
    const oldContent = await oldFile.arrayBuffer();
    const writable = await newFileHandle.createWritable();
    await writable.write(oldContent);
    await writable.close();

    await parentHandle.removeEntry(oldName);

    const newMetadata = { ...fileMetadata, handle: newFileHandle };
    this.nodesMetadata.set(id, newMetadata);
  }

  private metadataOfDirectoryOrThrow(id: Id): DirecotryRootMetadata | DirectoryMetadata {
    const metadata = this.metadataOrThrow(id);
    if (!(metadata.kind === "directory")) throwCritical("NOT_DIRECTORY_METADATA");
    return metadata;
  }

  private metadataOfFileOrThrow(id: Id): FileMetadata {
    const metadata = this.metadataOrThrow(id);
    if (!(metadata.kind === "file")) throwCritical("NOT_FILE_METADATA");
    return metadata;
  }
}
