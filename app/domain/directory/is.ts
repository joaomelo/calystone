import { isArtifact } from "@/domain/artifact";

import type { Directory } from "./directory";

export function isDirectory(value: unknown): value is Directory {
  if (!isArtifact(value)) return false;
  if (!("kind" in value)) return false;
  return value.kind === "directory";
}
