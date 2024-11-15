import type { Connection } from "@/domain/sources";
import type { App } from "vue";

import { createNodes } from "@/domain/nodes";
import { reactive, ref } from "vue";

import type { Store } from "./store";

import { key } from "./key";

export function createStore(): Store {
  return {
    connection: ref<Connection | undefined>(),
    install(app: App) {
      app.provide(key, this);
    },
    nodes: reactive(createNodes())
  };
}
