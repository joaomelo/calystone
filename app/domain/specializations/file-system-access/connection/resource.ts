import type { FsaResources } from "../source";

import { isFsaResources } from "../source";

export interface FsaConnectionResources extends FsaResources{
  root: FileSystemDirectoryHandle
  source: "file-system-access"
};

export function isFsaConnectionResources(resources: unknown): resources is FsaConnectionResources {
  if (!isFsaResources(resources)) return false;
  return "root" in resources;
}