import type { FsaResources } from "../resource";

import { isFsaResources } from "../resource";

export interface FsaConnectionResources extends FsaResources{
  root: FileSystemDirectoryHandle
  source: "file-system-access"
};

export function isFsaConnectionResources(resources: unknown): resources is FsaConnectionResources {
  if (!isFsaResources(resources)) return false;
  return "root" in resources;
}