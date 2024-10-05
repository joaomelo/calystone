import { createArtifacts } from "@data/artifacts";
import { loadHandlesOf } from "@data/handles";

import { type Store } from "./store";

export async function setRoot(handle: FileSystemDirectoryHandle, store: Store) {
  store.root.value = handle;
  store.artifacts.clear();
  const artifacts = await createArtifacts(loadHandlesOf(handle));
  artifacts.forEach(artifact => store.artifacts.set(artifact.id, artifact));
}

export function clearRoot(store: Store) {
  store.root.value = undefined;
  store.artifacts.clear();
}
