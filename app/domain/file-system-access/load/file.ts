import type { Id } from "@/utils";

import { createArtifact, solveMime } from "@/domain/artifact";

import type { FileSystemAccessArtifact } from "../artifact";

export async function loadFile(handle: FileSystemFileHandle, parentId?: Id): Promise<FileSystemAccessArtifact> {
  const file = await handle.getFile();
  const data = {
    lastModified: file.lastModified,
    mime: solveMime(handle.name),
    name: file.name,
    resources: { file, handle },
    size: file.size,
  };
  return createArtifact(data, parentId);
}