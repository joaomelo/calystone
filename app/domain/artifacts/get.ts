import type { Id } from "@/utils";

import type { Artifacts } from "./artifacts";

export function getArtifact(artifacts: Artifacts, id: Id) {
  const artifact = artifacts.get(id);
  if (!artifact) throw new Error(`id "${id}" must be a valid artifact id`);
  return artifact;
}
