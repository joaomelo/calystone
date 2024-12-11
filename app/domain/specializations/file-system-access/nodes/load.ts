import type { Id, Node } from "@/domain/nodes";

import { idle } from "@/domain/lang";
import { Artifact, Directory } from "@/domain/nodes";

import { FsaArtifactConnection } from "../artifact";

export async function* load(rootHandle: FileSystemDirectoryHandle): AsyncGenerator<Node> {
  const parentsToLoad: ParentToLoad[] = [{ parentHandle: rootHandle }];

  // will traverse the parent Handle using breadth-first search (BFS) approach. This way, the user can quickly see the first levels of the file system.
  while (parentsToLoad.length > 0) {
    const parentToLoad = parentsToLoad.shift();
    if (!parentToLoad) continue;

    const { parentHandle, parentId } = parentToLoad;
    for await (const child of parentHandle.values()) {
      await idle();

      if (child.kind === "file") {
        const artifact = await loadArtifact(child, parentId);
        yield artifact;
      } else {
        const directory = new Directory(child.name, parentId);
        yield directory;
        parentsToLoad.push({ parentHandle: child, parentId: directory.id });
      }
    }
  }
}

interface ParentToLoad {
  parentHandle: FileSystemDirectoryHandle;
  parentId?: Id;
};

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
