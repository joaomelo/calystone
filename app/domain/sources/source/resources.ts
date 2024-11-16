import { isObjectLike } from "@/utils";

import type { Source } from "./source";

import { isSource } from "./source";

export interface Resources {
  source: Source
}

export function isResources(resources: unknown): resources is Resources {
  if (!isObjectLike(resources)) return false;
  if (!("source" in resources)) return false;
  return isSource(resources.source);
}