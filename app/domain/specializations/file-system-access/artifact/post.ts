export async function postContent(content: ArrayBuffer, handle: FileSystemFileHandle): Promise<void> {
  const writableStream = await handle.createWritable();
  await writableStream.write(content);
  await writableStream.close();
}
