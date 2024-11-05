import type { Artifacts } from "@/domain/artifacts";

import { createIsId } from "@/domain/artifact";

import type { Artifact } from "../artifact/artifact";

import { list } from "./list";

export function path(artifacts: Artifacts, artifact: Artifact): string {
  const basePath = `/${artifact.name}`;
  if (!artifact.parentId) return basePath;

  const isParentId = createIsId(artifact.parentId);
  const parent = list(artifacts).find(isParentId);
  if (!parent) return basePath;

  return `${path(artifacts, parent)}${basePath}`;
}
