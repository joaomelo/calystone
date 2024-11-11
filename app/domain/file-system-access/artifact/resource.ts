import type { FsaResources } from "../resource";

import { isFsaResources } from "../resource";

export interface FsaArtifactResources extends FsaResources {
  file: File
  handle: FileSystemFileHandle,
}

export function isFsaArtifactResources(resources: unknown): resources is FsaArtifactResources {
  if (!isFsaResources(resources)) return false;
  return "file" in resources && "handle" in resources;
}