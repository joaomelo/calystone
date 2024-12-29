import type { ArtifactData } from "@/domain";

export async function fetchArtifact(handle: FileSystemFileHandle): Promise<ArtifactData> {
  const file: File = await handle.getFile();
  const content: ArrayBuffer = await file.arrayBuffer();
  return {
    content,
    lastModified: file.lastModified,
    size: file.size,
  };
}
