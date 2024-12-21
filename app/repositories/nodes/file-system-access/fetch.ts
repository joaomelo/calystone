export async function fetchArtifactContent(handle: FileSystemFileHandle): Promise<ArrayBuffer> {
  const file: File = await handle.getFile();
  const content: ArrayBuffer = await file.arrayBuffer();
  return content;
}
