import type { Artifact } from "@/domain/artifact";
import type { Id } from "@/utils";

import { createDirectory } from "@/domain/directory";
import { createFile } from "@/domain/file";
import { idle } from "@/utils";

export async function* loadFileSytem(root: FileSystemDirectoryHandle, parentId?: Id): AsyncGenerator<Artifact> {
  for await (const entry of root.values()) {
    await idle();

    if (entry.kind === "file") {
      const fetch = () => entry.getFile();
      const file = createFile(entry.name, fetch, parentId);
      yield file;
    } else {
      const directory = createDirectory(entry.name, parentId);
      yield directory;
      yield* loadFileSytem(entry, directory.id);
    }
  }
}
