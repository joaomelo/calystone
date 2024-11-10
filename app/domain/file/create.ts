import type { Id } from "@/utils";

import { createArtifact } from "@/domain/artifact";

import type { File } from "./file";

export function createFile<MediaResources>(data: FileData<MediaResources>, parentId?: Id) {
  const { name, ...rest } = data;
  const file: File<MediaResources> = {
    ...createArtifact(name, parentId),
    ...rest,
    kind: "file",
  };
  return file;
}

type FileData<MediaResources> = Pick<File<MediaResources>, "lastModified" | "media" | "mime" | "name" | "size">;