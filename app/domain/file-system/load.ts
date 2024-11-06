import type { Artifact } from "@/domain/artifact";
import type { Id } from "@/utils";

import { idle } from "@/utils";

import { loadDirectory } from "./load-directory";
import { loadFile } from "./load-file";

export async function* loadFileSystem(root: FileSystemDirectoryHandle, parentId?: Id): AsyncGenerator<Artifact> {
  for await (const entry of root.values()) {
    await idle();

    if (entry.kind === "file") {
      const file = await loadFile(entry, parentId);
      yield file;
    } else {
      const directory = loadDirectory(entry, parentId);
      yield directory;
      yield* loadFileSystem(entry, directory.id);
    }
  }
}
