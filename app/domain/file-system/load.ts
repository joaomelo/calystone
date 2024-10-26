import { type Artifact } from "@/domain/artifact";
import { createId, type Id } from "@/domain/ids";

export async function* fileSystemSourceLoad(handle: FileSystemDirectoryHandle, parentId?: Id): AsyncGenerator<Artifact> {
  for await (const entry of handle.values()) {
    const base = {
      id: createId(),
      name: entry.name,
      parentId,
    };

    if (entry.kind === "file") {
      const artifact: Artifact = {
        ...base,
        get content() { return entry.getFile(); },
        type: entry.kind,
      };
      yield artifact;
    } else {
      const artifact: Artifact = {
        ...base,
        type: entry.kind,
      };
      yield artifact;

      yield* fileSystemSourceLoad(entry, base.id);
    }
  }
}

