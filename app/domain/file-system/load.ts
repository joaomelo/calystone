import type { Artifact } from "@/domain/artifact";
import type { Id } from "@/utils";

import { createId, idle } from "@/utils";

export async function* load(handle: FileSystemDirectoryHandle, parentId?: Id): AsyncGenerator<Artifact> {

  for await (const entry of handle.values()) {
    await idle();

    const base = {
      id: createId(),
      name: entry.name,
      parentId,
    };

    if (entry.kind === "file") {
      const artifact: Artifact = {
        ...base,
        fetch: () => entry.getFile(),
        type: entry.kind,
      };
      yield artifact;
    } else {
      const artifact: Artifact = {
        ...base,
        type: entry.kind,
      };
      yield artifact;

      yield* load(entry, base.id);
    }
  }
}
