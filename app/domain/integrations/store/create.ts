import type { ConnectionUnion } from "@/domain/specializations";
import type { App } from "vue";

import { createNodes } from "@/domain/nodes";
import { reactive, ref } from "vue";

import type { Store } from "./store";

import { key } from "./key";

export function createStore(): Store {
  return {
    connection: ref<ConnectionUnion | undefined>(),
    install(app: App) {
      app.provide(key, this);
    },
    nodes: reactive(createNodes())
  };
}
