export async function postArtifact(handle: FileSystemFileHandle, content: ArrayBuffer): Promise<void> {
  const writableStream = await handle.createWritable();
  await writableStream.write(content);
  await writableStream.close();
}
