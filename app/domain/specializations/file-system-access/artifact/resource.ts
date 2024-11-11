import type { FsaResources } from "../source";

import { isFsaResources } from "../source";

export interface FsaArtifactResources extends FsaResources {
  file: File
  handle: FileSystemFileHandle,
}

export function isFsaArtifactResources(resources: unknown): resources is FsaArtifactResources {
  if (!isFsaResources(resources)) return false;
  return "file" in resources && "handle" in resources;
}