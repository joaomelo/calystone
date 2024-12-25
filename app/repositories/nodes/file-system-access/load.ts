import type { Id, Ignore, LoadNodeData } from "@/domain";

import { createId } from "@/domain";

export async function* loadNodesData(root: FileSystemDirectoryHandle, ignore: Ignore): AsyncGenerator<Load> {
  const parentsToLoad: ParentToLoad[] = [{ handle: root, path: "" }];

  // will traverse the parent handle using breadth-first search (BFS) approach. this way, the user can quickly see the first levels of the file system in the ui.
  while (parentsToLoad.length > 0) {

    const parentToLoad = parentsToLoad.shift();
    if (!parentToLoad) continue;

    for await (const handle of parentToLoad.handle.values()) {
      const path = `${parentToLoad.path}/${handle.name}`;

      if (ignore.ignores(path)) continue;

      const node = {
        id: createId(),
        name: handle.name,
        parentId: parentToLoad.id
      };

      if (handle.kind === "file") {
        const file = await handle.getFile();
        const artifact = {
          lastModified: file.lastModified,
          size: file.size,
          ...node
        };
        yield { handle, node: artifact };
      } else {
        yield { handle, node };
        parentsToLoad.push({ handle, id: node.id, path });
      }
    }
  }
}

interface ParentToLoad {
  handle: FileSystemDirectoryHandle;
  id?: Id;
  path: string;
};

interface Load { node: LoadNodeData, handle: FileSystemHandle };