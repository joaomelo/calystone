import { isArtifact } from "@/domain/artifact";

import type { File } from "./file";

export function isFile(value: unknown): value is File {
  if (!isArtifact(value)) return false;
  return (("fetch" in value) && (typeof value.fetch === "function"));
}