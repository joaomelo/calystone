import type { Id } from "@/utils";

import { createNode } from "@/domain/node";

import type { Artifact } from "./artifact";

export function createArtifact<MediaResources>(data: DocumentData<MediaResources>, parentId?: Id) {
  const { name, ...rest } = data;
  const document: Artifact<MediaResources> = {
    ...createNode(name, parentId),
    ...rest,
    kind: "artifact",
  };
  return document;
}

type DocumentData<MediaResources> = Pick<Artifact<MediaResources>, "lastModified" | "mime" | "name" | "resources" | "size">;