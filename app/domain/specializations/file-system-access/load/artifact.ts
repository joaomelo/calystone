import type { Id } from "@/utils";

import { createArtifact } from "@/domain/nodes";

import type { FsaArtifact } from "../artifact";

export async function loadArtifact(handle: FileSystemFileHandle, parentId?: Id): Promise<FsaArtifact> {
  const file = await handle.getFile();

  const data = {
    lastModified: file.lastModified,
    name: file.name,
    size: file.size,
  };

  const resources = {
    file,
    handle,
    source: "file-system-access"
  } as const;

  return {
    ...createArtifact(data, parentId),
    resources
  };
}