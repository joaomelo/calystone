import type { Id } from "@/utils";

import { createNode } from "@/domain/node";

import type { Directory } from "./directory";

export function createDirectory(name: string, parentId?: Id) {
  const directory: Directory = {
    ...createNode(name, parentId),
    kind: "directory",
  };
  return directory;
}