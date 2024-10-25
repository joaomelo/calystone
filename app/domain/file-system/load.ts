import { type Artifact } from "@/domain/artifacts";

import { type Handle } from "./handle";

export async function* fileSystemSourceLoad(handle: FileSystemDirectoryHandle): AsyncGenerator<Artifact> {
  for await (const entry of loadHandles(handle)) {
    const artifact: Artifact = {
      content: entry.kind === "file" ? entry.getFile() : undefined,
      id: generateId(entry),
      name: entry.name,
      parentId: undefined,
      type: entry.kind as Type,
    };
    yield artifact;
  }
}

export async function* loadHandles(handle: FileSystemDirectoryHandle): AsyncGenerator<Handle> {
  for await (const [name, entry] of handle.entries()) {
    yield entry;
    if (entry.kind === "directory") {
      yield* fileSystemSourceLoad(entry);
    }
  }
}