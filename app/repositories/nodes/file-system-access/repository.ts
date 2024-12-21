import type { Id, LoadNodeData, Matcher, NodesRepository } from "@/domain";

import { fetchArtifactContent } from "./fetch";
import { fileOrThrow } from "./file-or-throw";
import { loadNodesData } from "./load";
import { postArtifactContent } from "./post";

export class FsaNodesRepository implements NodesRepository {
  handles = new Map<Id, FileSystemHandle>();
  root: FileSystemDirectoryHandle;

  constructor(root: FileSystemDirectoryHandle) {
    this.root = root;
  }

  async fetchArtifactContent(id: Id): Promise<ArrayBuffer> {
    const handle = fileOrThrow(this.handles.get(id));
    return fetchArtifactContent(handle);
  }

  async *loadNodesData(ignore: Matcher): AsyncGenerator<LoadNodeData> {
    this.handles.clear();

    for await (const loadData of loadNodesData(this.root, ignore)) {
      this.handles.set(loadData.node.id, loadData.handle);
      yield loadData.node;
    }
  }

  async postArtifactContent(id: Id, content: ArrayBuffer): Promise<void> {
    const handle = fileOrThrow(this.handles.get(id));
    await postArtifactContent(handle, content);
  }
}
