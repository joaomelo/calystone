import type { SourceResources } from "@/domain/source";

import { isSourceResources } from "@/domain/source";

export interface FsaResources extends SourceResources {
  source: "file-system-access"
}

export function isFsaResources(resources: unknown):resources is FsaResources
{
  if (!isSourceResources(resources)) return false;
  return resources.source === "file-system-access";
}