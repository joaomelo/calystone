import { loadMedia } from "@/domain/media";

import type { Store } from "./store";

export async function feed(store: Store) {
  if (!store.media.value) throw new Error("media must be present in order to load");

  store.nodes.clear();
  for await (const node of loadMedia(store.media)) {
    store.nodes.set(node.id, node);
  }
}