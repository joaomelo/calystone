import { createArtifact } from "@/domain/artifact";

import type { Directory } from "./directory";

export function createDirectory(name: string, parent?: Directory) {
  const directory: Directory = {
    ...createArtifact(name, parent),
    children: []
  };
  return directory;
}