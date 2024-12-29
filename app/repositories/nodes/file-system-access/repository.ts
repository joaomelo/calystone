import type { ArtifactData, Id, NodeDataAndKind, NodesRepository } from "@/domain";

import { throwCritical } from "@/utils";

import { fetchArtifact } from "./fetch";
import { openDirectory } from "./open";
import { postArtifact } from "./post";

export class FsaNodesRepository implements NodesRepository {
  handles = new Map<Id, FileSystemHandle>();
  root: FileSystemDirectoryHandle;

  constructor(root: FileSystemDirectoryHandle) {
    this.root = root;
  }

  async fetchArtifact(id: Id): Promise<ArtifactData> {
    const handle = this.getFileOrThrow(id);
    return fetchArtifact(handle);
  }

  getDirectoryOrThrow(id: Id): FileSystemDirectoryHandle {
    const handle = this.getHandleOrThrow(id);
    if (!(handle instanceof FileSystemDirectoryHandle)) throwCritical("NOT_DIRECTORY_HANDLE", `the handle for the id ${id} is not a directory handle`);
    return handle;
  }

  getFileOrThrow(id: Id): FileSystemFileHandle {
    const handle = this.getHandleOrThrow(id);
    if (!(handle instanceof FileSystemFileHandle)) throwCritical("NOT_FILE_HANDLE", `the handle for the id ${id} is not a file handle`);
    return handle;
  }

  getHandleOrThrow(id: Id): FileSystemHandle {
    const handle = this.handles.get(id);
    if (!handle) throwCritical("NO_HANDLE", "the id must correspond to a handle");
    return handle;
  }

  async openDirectory(id?: Id): Promise<NodeDataAndKind[]> {
    if (!id) this.handles.clear();
    const handle = id ? this.getDirectoryOrThrow(id) : this.root;
    return openDirectory(handle, id);
  }

  async postArtifact(id: Id, content: ArrayBuffer): Promise<void> {
    const handle = this.getFileOrThrow(id);
    await postArtifact(handle, content);
  }
}
