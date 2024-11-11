import type { SourceResources } from "@/domain/source";
import type { Id } from "@/utils";

import { createNode } from "@/domain/node";

import type { Artifact } from "./artifact";

import { solveMime } from "./mime";

export function createArtifact<Resources extends SourceResources>(data: ArtifactData<Resources>, parentId?: Id) {
  const { name, ...rest } = data;
  const artifact: Artifact<Resources> = {
    ...createNode(name, parentId),
    ...rest,
    kind: "artifact",
    mime: solveMime(name),
  };
  return artifact;
}

type ArtifactData<Resources extends SourceResources> = Pick<Artifact<Resources>, "lastModified" | "name" | "resources" | "size">;