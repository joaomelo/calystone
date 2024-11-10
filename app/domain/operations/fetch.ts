import type { Artifact } from "@/domain/artifact";

import { isFileSystemAccessArtifact, } from "../file-system-access";

export function fetchArtifactContent<MediaArtifactResources>(artifact: Artifact<MediaArtifactResources>): Promise<ArrayBuffer> {
  if (isFileSystemAccessArtifact(artifact)) {
    return fetchFileSystemAccessArtifactContent(artifact);
  } else {
    throw new Error("an artifact must be provided");
  }
}