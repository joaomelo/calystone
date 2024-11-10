import type { FileSystemAccessArtifact } from "../artifact";

export async function fetchFileSystemAccessArtifactContent(artifact: FileSystemAccessArtifact): Promise<ArrayBuffer> {
  const content: ArrayBuffer = await artifact.resources.file.arrayBuffer();
  return content;
}
