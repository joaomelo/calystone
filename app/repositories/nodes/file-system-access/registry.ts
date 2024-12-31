import type { Id } from "@/domain";

import { throwCritical } from "@/utils";

export class HandlesRegistry {
  private handles = new Map<Id, FileSystemHandle>();

  clear() {
    this.handles.clear();
  }

  directoryHandleOrThrow(id: Id): FileSystemDirectoryHandle {
    const handle = this.handleOrThrow(id);
    if (!(handle instanceof FileSystemDirectoryHandle)) throwCritical("NOT_DIRECTORY_HANDLE", `the handle for the id ${id} is not a directory handle`);
    return handle;
  }

  fileHandleOrThrow(id: Id): FileSystemFileHandle {
    const handle = this.handleOrThrow(id);
    if (!(handle instanceof FileSystemFileHandle)) throwCritical("NOT_FILE_HANDLE", `the handle for the id ${id} is not a file handle`);
    return handle;
  }

  handleOrThrow(id: Id): FileSystemHandle {
    const handle = this.handles.get(id);
    if (!handle) throwCritical("NO_HANDLE", "the id must correspond to a handle");
    return handle;
  }

  set(id: Id, handle: FileSystemHandle) {
    this.handles.set(id, handle);
  }
}