import type { Artifact } from "@/domain/nodes";

import { fetchFsaArtifactContent, isFsaArtifact } from "@/domain/specializations";

export function fetchArtifactContent(artifact: Artifact): Promise<ArrayBuffer> {
  if (isFsaArtifact(artifact)) {
    return fetchFsaArtifactContent(artifact);
  } else {
    throw new Error("an artifact with source resources must be provided");
  }
}
