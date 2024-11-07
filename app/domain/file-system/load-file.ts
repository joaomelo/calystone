import type { Id } from "@/utils";

import { createFile } from "@/domain/file";

import { solveMime } from "./mime";

export async function loadFile(entry: FileSystemFileHandle, parentId?: Id) {
  const systemFile = await entry.getFile();
  const data = {
    fetch: () => systemFile.arrayBuffer(),
    lastModified: systemFile.lastModified,
    mime: solveMime(entry.name),
    name: systemFile.name,
    size: systemFile.size,
  };
  return createFile(data, parentId);
}