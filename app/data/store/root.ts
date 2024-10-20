import { createArtifacts } from "@/data/artifacts";
import { loadHandlesOf } from "@/lib";

import { type Store } from "./store";

export async function setRoot(handle: FileSystemDirectoryHandle, store: Store) {
  store.root.value = handle;
  store.artifacts.clear();

  const handles = await loadHandlesOf(handle);
  const artifacts = createArtifacts(handles);
  artifacts.forEach(artifact => store.artifacts.set(artifact.id, artifact));
}

export function clearRoot(store: Store) {
  store.root.value = undefined;
  store.artifacts.clear();
}
