import type { DirectoryDataOptions, Id } from "@/domain";

import { createId } from "@/domain";
import { throwCritical } from "@/utils";

import type { ArtifactOrDirectoryDataOptions } from "./file-system";

import { BaseFileSystemAdapter } from "./base";

interface DirectoryMetadata {
  handle: FileSystemDirectoryHandle,
  kind: "directory"
}
interface FileMetadata {
  kind: "file";
  handle: FileSystemFileHandle;
  parentHandle: FileSystemDirectoryHandle;
}
type NodeMetadata = DirectoryMetadata | FileMetadata;

export class FsaFileSystemAdapter extends BaseFileSystemAdapter<NodeMetadata> {
  constructor(rootHandle: FileSystemDirectoryHandle) {
    const rootData: DirectoryDataOptions = {
      id: createId(),
      name: rootHandle.name,
      parentId: undefined
    };
    const rootMetadata: DirectoryMetadata = {
      handle: rootHandle,
      kind: "directory"
    };
    super({ rootData, rootMetadata });
  }

  async fetchFileContent(id: Id): Promise<ArrayBuffer> {
    const { handle } = this.metadataOfFileOrThrow(id);
    const file: File = await handle.getFile();
    const content: ArrayBuffer = await file.arrayBuffer();
    return content;
  }

  async openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]> {
    const { handle } = this.metadataOfDirectoryOrThrow(id);
    const childrenData: ArtifactOrDirectoryDataOptions[] = [];

    for await (const childHandle of handle.values()) {
      const { kind, name } = childHandle;
      const childId = createId();

      let childData: ArtifactOrDirectoryDataOptions;
      let childMetadata: NodeMetadata;
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

  removeNode(): Promise<void> {
    throwCritical("NOT_IMPLEMENTED", "removeNode not implement");
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

  private metadataOfDirectoryOrThrow(id: Id): DirectoryMetadata {
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
