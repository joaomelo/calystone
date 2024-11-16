import type { Resources } from "@/domain/connection";

import { isResources } from "@/domain/connection";

export interface FsaResources extends Resources{
  source: "file-system-access"
}

export function isFsaResources(resources: unknown):resources is FsaResources
{
  if (!isResources(resources)) return false;
  return resources.source === "file-system-access";
}