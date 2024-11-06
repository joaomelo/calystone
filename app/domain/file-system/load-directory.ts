import type { Id } from "@/utils";

import { createDirectory } from "@/domain/directory";

export function loadDirectory(entry: FileSystemDirectoryHandle, parentId?: Id) {
  return createDirectory(entry.name, parentId);
}