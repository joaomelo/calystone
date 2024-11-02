import type { Artifact } from "@/domain/artifact";
import type { Directory } from "@/domain/directory";

import { createDirectory } from "@/domain/directory";
import { createFile } from "@/domain/file";
import { idle } from "@/utils";

import type { ActiveConnection } from "./connection";

export async function* load(connection: ActiveConnection): AsyncGenerator<Artifact> {
  connection.status = "loading";
  try {
    yield* loadHandle(connection.root);
  } finally {
    connection.status = "open";
  }
}

async function* loadHandle(handle: FileSystemDirectoryHandle, parent?: Directory): AsyncGenerator<Artifact> {
  for await (const entry of handle.values()) {
    await idle();

    if (entry.kind === "file") {
      const fetch = () => entry.getFile();
      const file = createFile(entry.name, fetch, parent);
      yield file;
    } else {
      const directory = createDirectory(entry.name, parent);
      yield directory;
      yield* loadHandle(entry, directory);
    }
  }
}
