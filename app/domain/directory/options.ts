import type { NodeDataOptions } from "@/domain/node";
import type { Nodes } from "@/domain/nodes";

import { isNodeDataOptions } from "@/domain/node";

export type DirectoryDataOptions = NodeDataOptions;

export interface DirectoryOptions extends DirectoryDataOptions {
  nodes: Nodes;
}

export function isDirectoryDataOptions(value: unknown): value is DirectoryDataOptions {
  return isNodeDataOptions(value);
}