import type { FileSystemAccessResources } from "../resource";

import { isFileSystemAccessResources } from "../resource";

export interface FileSystemAccessMediaResources extends FileSystemAccessResources{
  root: FileSystemDirectoryHandle
  source: "file-system-access"
};

export function isFileSystemAccessMediaResources(resources: unknown): resources is FileSystemAccessMediaResources {
  if (!isFileSystemAccessResources(resources)) return false;
  return "root" in resources;
}