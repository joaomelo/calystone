import { isArtifact } from "@/domain/artifact";

import type { File } from "./file";

export function isFile(value: unknown): value is File {
  if (!isArtifact(value)) return false;
  if (!(("fetch" in value) && (typeof value.fetch === "function"))) return false;
  if (!("kind" in value)) return false;
  return value.kind === "file";
}