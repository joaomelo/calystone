import type { Artifact } from "@/domain/nodes";

import { isText } from "@/domain/nodes";

import { postArtifactContent } from "./content";

export function postArtifactText(artifact: Artifact, text: string): Promise<void> {
  if (!isText(artifact)) throw new Error("artifact must have a mime text compatible to fetch text");
  const encoder = new TextEncoder();
  const content = encoder.encode(text).buffer;
  return postArtifactContent(artifact, content);
}
