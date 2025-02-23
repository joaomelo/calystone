import type { NodeDataOptions } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { isNodeDataOptions } from "@/domain/node";

export interface ArtifactOptions extends ArtifactDataOptions {
  nodes: Nodes;
}

export interface ArtifactDataOptions extends NodeDataOptions {
  lastModified: number;
  size: number;
};

export function isArtifactDataOptions(value: unknown): value is ArtifactDataOptions {
  if (!isNodeDataOptions(value)) return false;
  if (!("lastModified" in value) || (typeof value.lastModified !== "number")) return false;
  if (!("size" in value) || (typeof value.size !== "number")) return false;
  return true;
}