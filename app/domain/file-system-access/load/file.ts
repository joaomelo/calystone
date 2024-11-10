import type { Id } from "@/utils";

import { createArtifact } from "@/domain/artifact";

import type { FileSystemAccessArtifact, FileSystemAccessArtifactResources } from "../artifact";

export async function loadFile(handle: FileSystemFileHandle, parentId?: Id): Promise<FileSystemAccessArtifact> {
  const file = await handle.getFile();
  const resources: FileSystemAccessArtifactResources = { file, handle, source: "file-system-access" };

  const data = {
    lastModified: file.lastModified,
    name: file.name,
    resources,
    size: file.size,
  };

  return createArtifact(data, parentId);
}