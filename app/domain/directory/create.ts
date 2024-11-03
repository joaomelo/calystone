import type { Id } from "@/utils";

import { createArtifact } from "@/domain/artifact";

import type { Directory } from "./directory";

export function createDirectory(name: string, parentId?: Id) {
  const directory: Directory = {
    ...createArtifact(name, parentId),
    kind: "directory",
  };
  return directory;
}