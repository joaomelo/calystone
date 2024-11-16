import type { Connection } from "@/domain/";

import type { Store } from "./store";

export async function connect(store: Store, connection: Connection) {
  store.status.value = "busy";
  try {
    store.connection.value = connection;
    store.nodes.clear();
    for await (const node of connection.load()) {
      store.nodes.set(node.id, node);
    }
  } finally {
    store.status.value = "idle";
  }
}