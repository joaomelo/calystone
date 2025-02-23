import type { NodeDataOptions } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { isNodeDataOptions } from "@/domain/node";

export interface DirectoryOptions extends DirectoryDataOptions {
  nodes: Nodes;
}

export type DirectoryDataOptions = NodeDataOptions;

export function isDirectoryDataOptions(value: unknown): value is DirectoryDataOptions {
  return isNodeDataOptions(value);
}