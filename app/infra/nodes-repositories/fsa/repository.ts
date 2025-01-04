import type { ArtifactData, Id, Kind, NodeDataAndKind } from "@/domain";

import { createId } from "@/domain";
import { throwCritical } from "@/utils";

import { NodesRepositoryBase } from "../repository";

export class FsaNodesRepository extends NodesRepositoryBase<FileSystemHandle> {
  constructor(rootHandle: FileSystemDirectoryHandle) {
    const rootData: NodeDataAndKind = {
      id: createId(),
      kind: "directory",
      name: rootHandle.name,
      parentId: undefined
    };
    super(rootData, rootHandle);
  }

  private metadataOfDirectoryOrThrow(id: Id): FileSystemDirectoryHandle {
    const handle = this.metadataOfNodeOrThrow(id);
    if (!(handle instanceof FileSystemDirectoryHandle)) throwCritical("NOT_DIRECTORY_HANDLE", `the handle for the id ${id} is not a directory handle`);
    return handle;
  }

  private metadataOfFileOrThrow(id: Id): FileSystemFileHandle {
    const handle = this.metadataOfNodeOrThrow(id);
    if (!(handle instanceof FileSystemFileHandle)) throwCritical("NOT_FILE_HANDLE", `the handle for the id ${id} is not a file handle`);
    return handle;
  }

  private metadataOfNodeOrThrow(id: Id): FileSystemHandle {
    const handle = this.nodesMetadata.get(id);
    if (!handle) throwCritical("NO_HANDLE", "the id must correspond to a handle");
    return handle;
  }

  async fetchArtifact(id: Id): Promise<ArtifactData> {
    const handle = this.metadataOfFileOrThrow(id);
    const file: File = await handle.getFile();
    const content: ArrayBuffer = await file.arrayBuffer();
    return {
      content,
      lastModified: file.lastModified,
      size: file.size,
    };
  }

  async openDirectory(id: Id): Promise<NodeDataAndKind[]> {
    const handle = this.metadataOfDirectoryOrThrow(id);

    const childrenData: NodeDataAndKind[] = [];
    for await (const childHandle of handle.values()) {
      const kind: Kind = childHandle.kind === "file" ? "artifact" : "directory";
      const childId = createId();
      const childData = {
        id: childId,
        kind,
        name: childHandle.name,
        parentId: id
      };
      this.nodesMetadata.set(childId, childHandle);
      childrenData.push(childData);
    }
    return childrenData;
  }

  async postArtifact(id: Id, content: ArrayBuffer): Promise<void> {
    const handle = this.metadataOfFileOrThrow(id);
    const writableStream = await handle.createWritable();
    await writableStream.write(content);
    await writableStream.close();
  }
}
