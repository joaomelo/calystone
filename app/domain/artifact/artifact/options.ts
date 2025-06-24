import type { NodeOptions } from "@/domain/node";

import { isNodeOptions } from "@/domain/node";

export interface ArtifactOptions extends NodeOptions {
  lastModified: number;
  size: number;
}

export function isArtifactOptions(value: unknown): value is ArtifactOptions {
  if (!isNodeOptions(value)) return false;
  if (!("lastModified" in value) || (typeof value.lastModified !== "number")) return false;
  if (!("size" in value) || (typeof value.size !== "number")) return false;
  return true;
}