import { isObjectLike } from "@/utils";

export interface MediaResources {
  source: Source
}

const sources = ["fileSystemAccess", "oneDrive"] as const;

type Source = typeof sources[number];

export function isMediaResources(resources: unknown): resources is MediaResources {
  if (!isObjectLike(resources)) return false;
  if (!("source" in resources)) return false;
  if (typeof resources.source !== "string") return false;

  return sources.some(s => s === resources.source);
}