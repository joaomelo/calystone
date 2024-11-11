import type { Artifact } from "@/domain/artifact";

import { isArtifact } from "@/domain/artifact";

import type { FsaArtifactResources } from "./resource";

import { isFsaArtifactResources } from "./resource";

export type FsaArtifact = Artifact<FsaArtifactResources>;

export function isFsaArtifact(artifact: unknown): artifact is FsaArtifact {
  if (!isArtifact(artifact)) return false;
  return isFsaArtifactResources(artifact.resources);
}