import type { FileSystemAccessResources } from "../resource";

import { isFileSystemAccessResources } from "../resource";

export interface FileSystemAccessArtifactResources extends FileSystemAccessResources {
  file: File
  handle: FileSystemFileHandle,
}

export function isFileSystemAccessArtifactResources(resources: unknown): resources is FileSystemAccessArtifactResources {
  if (!isFileSystemAccessResources(resources)) return false;
  return "file" in resources && "handle" in resources;
}