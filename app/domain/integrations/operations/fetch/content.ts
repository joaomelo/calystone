import type { ArtifactUnion } from "@/domain/specializations";

import { fetchFsaArtifactContent, isFsaArtifact } from "@/domain/specializations";

export function fetchArtifactContent(artifact: ArtifactUnion): Promise<ArrayBuffer> {
  if (isFsaArtifact(artifact)) {
    return fetchFsaArtifactContent(artifact);
  } else {
    throw new Error("an artifact must be provided");
  }
}
