import type { TextArtifact } from "@/domain/nodes";

import { fetchArtifactContent } from "../fetch";

export async function fetchText(artifact: Artifact): Promise<string> {
  const buffer = await fetchArtifactContent(artifact);
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(buffer);
}