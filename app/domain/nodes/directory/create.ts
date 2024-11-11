import type { Id } from "@/utils";

import type { Directory } from "./directory";

import { createNode } from "../node";

export function createDirectory(name: string, parentId?: Id) {
  const directory: Directory = {
    ...createNode(name, parentId),
    kind: "directory",
  };
  return directory;
}