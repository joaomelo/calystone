import type { Id } from "@/utils";

import { createArtifact } from "@/domain/artifact";

import type { Fetch, File } from "./file";

export function createFile(name: string, fetch: Fetch, parentId?: Id) {
  const file: File = {
    ...createArtifact(name, parentId),
    fetch,
    kind: "file",
  };
  return file;
}