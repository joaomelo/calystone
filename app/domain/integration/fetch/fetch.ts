import { fetchFsaArtifactContent, isFsaArtifact } from "@/domain/file-system-access";

import type { ArtifactUnion } from "../unions";

export function fetchArtifactContent(artifact: ArtifactUnion): Promise<ArrayBuffer> {
  if (isFsaArtifact(artifact)) {
    return fetchFsaArtifactContent(artifact);
  } else {
    throw new Error("an artifact must be provided");
  }
}
