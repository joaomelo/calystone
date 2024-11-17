import type { App } from "vue";

import { Nodes } from "@/domain/nodes";
import { reactive } from "vue";

import { key } from "./key";
import { useStore } from "./use";

export class Store {
  nodes: Nodes = reactive(new Nodes());

  static use(): Store {
    return useStore();
  }

  install(app: App) {
    app.provide(key, this);
  }
}