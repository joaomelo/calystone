import type { Artifact } from "@/domain/artifact";
import type { Directory } from "@/domain/directory";

import { createDirectory } from "@/domain/directory";
import { createFile } from "@/domain/file";
import { idle } from "@/utils";

export async function* loadFileSytem(root: FileSystemDirectoryHandle, parent?: Directory): AsyncGenerator<Artifact> {
  for await (const entry of root.values()) {
    await idle();

    if (entry.kind === "file") {
      const fetch = () => entry.getFile();
      const file = createFile(entry.name, fetch, parent);
      yield file;
    } else {
      const directory = createDirectory(entry.name, parent);
      yield directory;
      yield* loadFileSytem(entry, directory);
    }
  }
}
