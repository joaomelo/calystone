import type { Id } from "@/utils";

import { createArtifact } from "@/domain/artifact";

import type { FsaArtifact, FsaArtifactResources } from "../artifact";

export async function loadFile(handle: FileSystemFileHandle, parentId?: Id): Promise<FsaArtifact> {
  const file = await handle.getFile();
  const resources: FsaArtifactResources = { file, handle, source: "file-system-access" };

  const data = {
    lastModified: file.lastModified,
    name: file.name,
    resources,
    size: file.size,
  };

  return createArtifact(data, parentId);
}