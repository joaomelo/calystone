import type { NodeData } from "@/domain/nodes/node";

import { isNodeData } from "@/domain/nodes/node";

export type DirectoryData = NodeData;

export function isDirectoryData(value: unknown): value is DirectoryData {
  return isNodeData(value);
}