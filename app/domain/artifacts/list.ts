import type { Artifact } from "@/domain/artifact";

import type { Artifacts } from "./artifacts";

type Predicate = (artifact: Artifact) => boolean;

export function listArtifacts(artifacts: Artifacts, predicate?: Predicate) {
  if (!predicate) return Array.from(artifacts.values());
  return Array.from(artifacts.values()).filter(predicate);
}

export function listRoots(artifacts: Artifacts) {
  return listArtifacts(artifacts, ({ parentId }) => !parentId);
}
