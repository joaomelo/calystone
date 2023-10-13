import type { WithId } from "@shared";

export function createIsChildOf(parentOrParentId: WithId) {
  const parentId =
    typeof parentOrParentId === "string"
      ? parentOrParentId
      : parentOrParentId.id;

  return (artifact) => artifact.parentId === parentId;
}

export function createIsId(artifactOrId) {
  const id = artifactOrId?.id || artifactOrId;
  return (artifact) => artifact.id === id;
}
