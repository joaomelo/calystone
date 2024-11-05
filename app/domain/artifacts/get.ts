import type { Id } from "@/utils";

import type { Artifacts } from "./artifacts";

export function getOrThrow(artifacts: Artifacts, id: Id) {
  const artifact = get(artifacts, id);
  if (!artifact) throw new Error(`id "${id}" must be a valid artifact id`);
  return artifact;
}

export function get(artifacts: Artifacts, id: Id) {
  const artifact = artifacts.get(id);
  return artifact;
}