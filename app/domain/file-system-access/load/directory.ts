import type { Node } from "@/domain/node";
import type { Id } from "@/utils";

import { createDirectory } from "@/domain/directory";
import { idle } from "@/utils";

import { loadFile } from "./file";

export async function* loadDirectory (entry: FileSystemDirectoryHandle, parentId?: Id): AsyncGenerator<Node> {
  for await (const child of entry.values()) {
    await idle();

    if (child.kind === "file") {
      const file = await loadFile(child, parentId);
      yield file;
    } else {
      const directory = createDirectory(child.name, parentId);
      yield directory;
      yield* loadDirectory(child, directory.id);
    }
  }
}