import type { SourceResources } from "@/domain/source";

import { isSourceResources } from "@/domain/source";

export interface FileSystemAccessResources extends SourceResources {
  source: "file-system-access"
}

export function isFileSystemAccessResources(resources: unknown):resources is FileSystemAccessResources
{
  if (!isSourceResources(resources)) return false;
  return resources.source === "file-system-access";
}