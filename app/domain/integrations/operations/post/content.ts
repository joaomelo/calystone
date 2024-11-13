import type { Artifact } from "@/domain/nodes";

import { isFsaArtifact, postFsaArtifactContent } from "@/domain/specializations";

export function postArtifactContent(artifact: Artifact, content: ArrayBuffer): Promise<void> {
  if (isFsaArtifact(artifact)) {
    return postFsaArtifactContent(artifact, content);
  } else {
    throw new Error("an artifact with source resources must be provided");
  }
}
