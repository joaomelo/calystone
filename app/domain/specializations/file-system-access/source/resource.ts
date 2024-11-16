import type { Resources } from "@/domain/sources";

import { isResources } from "@/domain/sources";

export interface FsaResources extends Resources{
  source: "file-system-access"
}

export function isFsaResources(resources: unknown):resources is FsaResources
{
  if (!isResources(resources)) return false;
  return resources.source === "file-system-access";
}