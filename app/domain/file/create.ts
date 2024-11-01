import type { Directory } from "@/domain/directory";

import { createArtifact } from "@/domain/artifact";

import type { Fetch, File } from "./file";

export function createFile(name: string, fetch: Fetch, parent?: Directory) {
  const file: File = {
    ...createArtifact(name, parent),
    fetch
  };
  return file;
}