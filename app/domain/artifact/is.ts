import type { Id } from "@/utils";

import { isId, isObjectLike } from "@/utils";
import { extractId } from "@/utils";

import type { Artifact } from "./artifact";

export function isArtifact(value: unknown): value is Artifact {
  if (!isObjectLike(value)) return false;
  if (!("id" in value && isId(value.id))) return false;
  return "name" in value && typeof value.name === "string";
}

export function isRoot(artifact: Artifact): boolean {
  return !artifact.parentId;
}

export function createIsId(id: Id) {
  return (artifact: Artifact) => artifact.id === id;
}

export function isChildrenWith(parentOrId: Artifact | Id) {
  const id = extractId(parentOrId);
  return (artifact: Artifact) => artifact.parentId === id;
}