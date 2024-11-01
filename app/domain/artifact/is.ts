import { isId, isObjectLike } from "@/utils";

import type { Artifact } from "./artifact";

export function isArtifact(value: unknown): value is Artifact {
  if (!isObjectLike(value)) return false;
  if (!("id" in value && isId(value.id))) return false;
  return "name" in value && typeof value.name === "string";
}