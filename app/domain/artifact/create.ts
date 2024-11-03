import type { Id } from "@/utils";

import { createId } from "@/utils";

import type { Artifact } from "./artifact";

export function createArtifact(name: string, parentId? : Id) {
  const artifact: Artifact = {
    id: createId(),
    name,
    parentId,
  };
  return artifact;
}