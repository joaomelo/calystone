import type { FsaArtifact } from "../artifact";

export async function postFsaArtifactContent(artifact: FsaArtifact, content: ArrayBuffer): Promise<void> {
  const { handle } = artifact.resources;
  const writableStream = await handle.createWritable();
  await writableStream.write(content);
  await writableStream.close();
}
