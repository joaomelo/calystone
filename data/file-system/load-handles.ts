import { type Handle } from "./handle";

export async function loadHandlesOf(root: FileSystemDirectoryHandle) {
  const handles: Handle[] = [];

  const values = root.values();
  for await (const handle of values) {
    handles.push(handle);
  }

  return handles;
}
