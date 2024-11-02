import { loadSource } from "@/domain/source";

import type { Store } from "./store";

export async function feedStore(store: Store) {
  if (store.source.status !== "open") throw new Error("The store's source must be open in order to load");

  store.artifacts.clear();
  for await (const artifact of loadSource(store.source)) {
    store.artifacts.set(artifact.id, artifact);
  }
}