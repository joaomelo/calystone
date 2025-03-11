import type { DirectoryDataOptions, Id } from "@/domain";

import { createId } from "@/domain";
import { throwCritical } from "@/utils";

import type { ArtifactOrDirectoryDataOptions } from "./file-system";

import { BaseFileSystemAdapter } from "./base";

export class FsaFileSystemAdapter extends BaseFileSystemAdapter<FileSystemHandle> {
  constructor(rootHandle: FileSystemDirectoryHandle) {
    const rootData: DirectoryDataOptions = {
      id: createId(),
      name: rootHandle.name,
      parentId: undefined
    };
    super({ rootData, rootMetadata: rootHandle });
  }

  async fetchFileContent(id: Id): Promise<ArrayBuffer> {
    const handle = this.metadataOfFileOrThrow(id);
    const file: File = await handle.getFile();
    const content: ArrayBuffer = await file.arrayBuffer();
    return content;
  }

  async openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]> {
    const handle = this.metadataOfDirectoryOrThrow(id);
    const childrenData: ArtifactOrDirectoryDataOptions[] = [];

    for await (const childHandle of handle.values()) {
      const { kind, name } = childHandle;
      const childId = createId();

      let childData: ArtifactOrDirectoryDataOptions = {
        id: childId,
        name,
        parentId: id,
      };

      if (kind === "file") {
        const { lastModified, size } = await childHandle.getFile();
        childData = {
          ...childData,
          lastModified: lastModified,
          size: size,
        };
      }

      this.nodesMetadata.set(childId, childHandle);
      childrenData.push(childData);
    }
    return childrenData;
  }

  async postFileContent({ content, id }: { content: ArrayBuffer; id: Id, }): Promise<void> {
    const handle = this.metadataOfFileOrThrow(id);
    const writableStream = await handle.createWritable();
    await writableStream.write(content);
    await writableStream.close();
  }

  renameDirectory(): Promise<void> {
    throwCritical("NOT_IMPLEMENTED", "method not implemented");
  }

  renameFile(): Promise<void> {
    throwCritical("NOT_IMPLEMENTED", "method not implemented");
  }

  private metadataOfDirectoryOrThrow(id: Id): FileSystemDirectoryHandle {
    const handle = this.metadataOrThrow(id);
    if (!(handle instanceof FileSystemDirectoryHandle)) throwCritical("NOT_DIRECTORY_HANDLE", `the handle for the id ${id} is not a directory handle`);
    return handle;
  }

  private metadataOfFileOrThrow(id: Id): FileSystemFileHandle {
    const handle = this.metadataOrThrow(id);
    if (!(handle instanceof FileSystemFileHandle)) throwCritical("NOT_FILE_HANDLE", `the handle for the id ${id} is not a file handle`);
    return handle;
  }

}
