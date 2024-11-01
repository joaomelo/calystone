import { isArtifact } from "@/domain/artifact";

import type { Directory } from "./directory";

export function isDirectory(value: unknown): value is Directory {
  if (!isArtifact(value)) return false;
  if (!("children" in value && Array.isArray(value.children))) return false;
  return value.children.every(isArtifact);
}