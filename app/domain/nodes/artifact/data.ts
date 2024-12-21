import type { NodeData } from "@/domain/nodes/node";

import { isNodeData } from "@/domain/nodes/node";

export type ArtifactData = {
  lastModified: number;
  size: number;
} & NodeData;

export function isArtifactData(value: unknown): value is ArtifactData {
  if (!isNodeData(value)) return false;
  if (!("lastModified" in value) || (typeof value.lastModified !== "number")) return false;
  if (!("size" in value) || (typeof value.size !== "number")) return false;
  return true;
}