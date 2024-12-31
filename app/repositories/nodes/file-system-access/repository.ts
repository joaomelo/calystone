import type { ArtifactData, Id, Kind, NodeDataAndKind, NodesRepository } from "@/domain";

import { createId } from "@/domain";

import { HandlesRegistry } from "./registry";

export class FsaNodesRepository implements NodesRepository {
  registry: HandlesRegistry;
  rootData: NodeDataAndKind;
  rootHandle: FileSystemDirectoryHandle;

  constructor(rootHandle: FileSystemDirectoryHandle) {
    this.rootData = {
      id: createId(),
      kind: "directory",
      name: rootHandle.name,
      parentId: undefined
    };
    this.rootHandle = rootHandle;
    this.registry = new HandlesRegistry();
  }

  private async openDirectoryHandle(parentHandle: FileSystemDirectoryHandle, parentId?: Id) {
    const childrenData: NodeDataAndKind[] = [];
    for await (const handle of parentHandle.values()) {
      const kind: Kind = handle.kind === "file" ? "artifact" : "directory";
      const id = createId();
      const childData = { id, kind, name: handle.name, parentId };
      this.registry.set(id, handle);
      childrenData.push(childData);
    }
    return childrenData;
  }

  clearAndfetchRoot(): NodeDataAndKind {
    this.registry.clear();
    this.registry.set(this.rootData.id, this.rootHandle);
    return this.rootData;
  }

  async fetchArtifact(id: Id): Promise<ArtifactData> {
    const handle = this.registry.fileHandleOrThrow(id);
    const file: File = await handle.getFile();
    const content: ArrayBuffer = await file.arrayBuffer();
    return {
      content,
      lastModified: file.lastModified,
      size: file.size,
    };
  }

  openDirectory(id: Id): Promise<NodeDataAndKind[]> {
    const handle = this.registry.directoryHandleOrThrow(id);
    return this.openDirectoryHandle(handle, id);
  }

  async postArtifact(id: Id, content: ArrayBuffer): Promise<void> {
    const handle = this.registry.fileHandleOrThrow(id);
    const writableStream = await handle.createWritable();
    await writableStream.write(content);
    await writableStream.close();
  }
}
