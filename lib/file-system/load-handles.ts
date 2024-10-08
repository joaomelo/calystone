import { type Handle } from "./handle";

export async function loadHandlesOf(source: FileSystemDirectoryHandle): Promise<Handle[]> {
  const handles: Handle[] = [];

  const values = source.values();
  for await (const handle of values) {
    handles.push(handle);
  }

  return handles;
}
