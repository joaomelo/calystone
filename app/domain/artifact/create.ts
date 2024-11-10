import type { SourceResources } from "@/domain/source";
import type { Id } from "@/utils";

import { createNode } from "@/domain/node";

import type { Artifact } from "./artifact";

import { solveMime } from "./mime";

export function createArtifact<ArtifactResources extends SourceResources>(data: ArtifactData<ArtifactResources>, parentId?: Id) {
  const { name, ...rest } = data;
  const artifact: Artifact<ArtifactResources> = {
    ...createNode(name, parentId),
    ...rest,
    kind: "artifact",
    mime: solveMime(name),
  };
  return artifact;
}

type ArtifactData<ArtifactResources extends SourceResources> = Pick<Artifact<ArtifactResources>, "lastModified" | "name" | "resources" | "size">;