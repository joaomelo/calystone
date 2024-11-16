import type { Node } from "@/domain/nodes";
import type { Id } from "@/utils";

import { createDirectory } from "@/domain/nodes";
import { idle } from "@/utils";

import { loadArtifact } from "./artifact";

export async function* load(entry: FileSystemDirectoryHandle, parentId?: Id): AsyncGenerator<Node> {
  for await (const child of entry.values()) {
    await idle();

    if (child.kind === "file") {
      const artifact = await loadArtifact(child, parentId);
      yield artifact;
    } else {
      const directory = createDirectory(child.name, parentId);
      yield directory;
      yield* load(child, directory.id);
    }
  }
}