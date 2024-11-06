import type { Id } from "@/utils";

import { createArtifact } from "@/domain/artifact";

import type { File } from "./file";

export function createFile(data: FileData, parentId?: Id) {
  const { name, ...rest } = data;
  const file: File = {
    ...createArtifact(name, parentId),
    ...rest,
    kind: "file",
  };
  return file;
}

type FileData = Pick<File, "fetch" | "lastModified" | "mime" | "name" | "size">;