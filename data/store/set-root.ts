import { type Store } from "./store";

export function setRoot(handle: FileSystemDirectoryHandle, store: Store) {
  store.rootHandle = handle;
  store.entries.clear();
}