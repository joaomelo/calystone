import { isObjectLike } from "@/utils";

import type { Source } from "./source";

import { isSource } from "./source";

export interface SourceResources {
  source: Source
}

export function isSourceResources(resources: unknown): resources is SourceResources {
  if (!isObjectLike(resources)) return false;
  if (!("source" in resources)) return false;
  return isSource(resources.source);
}