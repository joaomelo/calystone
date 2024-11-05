import type { Artifacts } from "@/domain/artifacts";

import type { Artifact } from "../artifact/artifact";

import { getOrThrow } from "./get";

export function createPath(artifacts: Artifacts){
  const path = (artifact: Artifact): string => {
    const basePath = `/${artifact.name}`;
    if (!artifact.parentId) return basePath;

    const parent = getOrThrow(artifacts, artifact.parentId);
    return `${path(parent)}${basePath}`;
  };

  return path;
}
