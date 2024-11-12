import type { ArtifactUnion } from "@/domain/specializations";

import { isText } from "@/domain/nodes";

import { fetchArtifactContent } from "./content";

export async function fetchArtifactText(artifact: ArtifactUnion): Promise<string> {
  if (!isText(artifact)) throw new Error("artifact must have a mime text compatible to fetch text");

  const buffer = await fetchArtifactContent(artifact);
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(buffer);
}