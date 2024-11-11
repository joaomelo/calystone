import type { FsaArtifact } from "../artifact";

export async function fetchFsaArtifactContent(artifact: FsaArtifact): Promise<ArrayBuffer> {
  const content: ArrayBuffer = await artifact.resources.file.arrayBuffer();
  return content;
}
