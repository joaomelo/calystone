import type { Id } from "@/utils";

import { createNode } from "@/domain/nodes/node";

import type { Artifact } from "./artifact";

import { solveMime } from "../mime";

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