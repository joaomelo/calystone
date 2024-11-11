import type { Id } from "@/utils";

import type { Artifact } from "./artifact";

import { createNode } from "../node";
import { solveMime } from "./mime";

export function createArtifact(data: ArtifactData, parentId?: Id) {
  const { name, ...rest } = data;
  const artifact: Artifact = {
    ...createNode(name, parentId),
    ...rest,
    kind: "artifact",
    mime: solveMime(name),
  };
  return artifact;
}

type ArtifactData = Pick<Artifact, "lastModified" | "name" | "size">;