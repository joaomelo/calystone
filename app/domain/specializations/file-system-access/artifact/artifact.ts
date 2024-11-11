import type { Artifact } from "@/domain/nodes";

import { isArtifact } from "@/domain/nodes";

import type { FsaArtifactResources } from "./resource";

import { isFsaArtifactResources } from "./resource";

export interface FsaArtifact extends Artifact {
  resources: FsaArtifactResources
};

export function isFsaArtifact(artifact: unknown): artifact is FsaArtifact {
  if (!isArtifact(artifact)) return false;
  if (!("resources" in artifact)) return false;
  return isFsaArtifactResources(artifact.resources);
}