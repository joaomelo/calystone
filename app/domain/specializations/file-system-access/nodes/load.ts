import type { Id, Node, Nodes } from "@/domain/nodes";

import { idle } from "@/domain/lang";
import { Artifact, Directory } from "@/domain/nodes";

import { FsaArtifactConnection } from "../artifact";

export async function* load({ nodes, root }: Options): AsyncGenerator<Node> {
  const parentsToLoad: ParentToLoad[] = [{ parentHandle: root }];

  // will traverse the parent handle using breadth-first search (BFS) approach. this way, the user can quickly see the first levels of the file system in the ui.
  while (parentsToLoad.length > 0) {
    const parentToLoad = parentsToLoad.shift();
    if (!parentToLoad) continue;

    const { parentHandle, parentId } = parentToLoad;
    for await (const handle of parentHandle.values()) {
      await idle();

      const nodeData = {
        name: handle.name,
        nodes,
        parentId: parentId,
      };

      if (handle.kind === "file") {
        const file = await handle.getFile();
        const artifact = new Artifact({
          connection: new FsaArtifactConnection(handle),
          lastModified: file.lastModified,
          size: file.size,
          ...nodeData
        });
        yield artifact;
      } else {
        const directory = new Directory(nodeData);
        yield directory;
        parentsToLoad.push({ parentHandle: handle, parentId: directory.id });
      }
    }
  }
}

interface ParentToLoad {
  parentHandle: FileSystemDirectoryHandle;
  parentId?: Id;
};

interface Options {
  nodes: Nodes;
  root: FileSystemDirectoryHandle;
}
