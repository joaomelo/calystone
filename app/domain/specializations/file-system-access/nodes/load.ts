import type { Node } from "@/domain/nodes";
import type { Id } from "@/utils";

import { Artifact, Directory } from "@/domain/nodes";
import { idle } from "@/utils";

import { FsaArtifactConnection } from "../artifact";

export async function* load(entry: FileSystemDirectoryHandle, parentId?: Id): AsyncGenerator<Node> {
  for await (const child of entry.values()) {
    await idle();

    if (child.kind === "file") {
      const artifact = await loadArtifact(child, parentId);
      yield artifact;
    } else {
      const directory = new Directory(child.name, parentId);
      yield directory;
      yield* load(child, directory.id);
    }
  }
}

export async function loadArtifact(handle: FileSystemFileHandle, parentId?: Id): Promise<Artifact> {
  const file = await handle.getFile();

  const data = {
    lastModified: file.lastModified,
    name: file.name,
    parentId: parentId,
    size: file.size,
  };

  const connection = new FsaArtifactConnection(handle);
  return new Artifact(data, connection);
}