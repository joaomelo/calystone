import type { Artifacts } from "@/domain/artifacts";

import type { Artifact } from "../artifact/artifact";

import { getOrThrow } from "./get";

export function path(artifacts: Artifacts, artifact: Artifact): string {
  const basePath = `/${artifact.name}`;
  if (!artifact.parentId) return basePath;

  const parent = getOrThrow(artifacts, artifact.parentId);
  return `${path(artifacts, parent)}${basePath}`;
}
