import { throwCritical } from "@/domain";

export function fileOrThrow(handle?: FileSystemHandle): FileSystemFileHandle {
  if (!handle) {
    throwCritical("NO_HANDLE", "a handle handle must be provided");
  }
  if (!(handle instanceof FileSystemFileHandle)) {
    throwCritical("NOT_FILE_HANDLE", "the handle is not a file handle");
  }
  return handle;
}