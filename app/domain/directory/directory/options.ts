import type { NodeOptions } from "@/domain/node";

import { isNodeOptions } from "@/domain/node";

export type DirectoryOptions = NodeOptions;

export function isDirectoryOptions(value: unknown): value is DirectoryOptions {
  return isNodeOptions(value);
}