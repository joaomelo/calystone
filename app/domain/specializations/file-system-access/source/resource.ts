import type { SourceResources } from "@/domain/sources";

import { isSourceResources } from "@/domain/sources";

export interface FsaResources extends SourceResources{
  source: "file-system-access"
}

export function isFsaResources(resources: unknown):resources is FsaResources
{
  if (!isSourceResources(resources)) return false;
  return resources.source === "file-system-access";
}