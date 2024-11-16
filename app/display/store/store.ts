import type { Connection } from "@/domain/connection";
import type { Nodes } from "@/domain/nodes";
import type { App, Ref } from "vue";

import { createNodes } from "@/domain/nodes";
import { reactive, ref } from "vue";

import type { Status } from "./status";

import { connect } from "./connect";
import { key } from "./key";
import { reset } from "./reset";
import { useStore } from "./use";

export class Store {
  connection: Ref<Connection | undefined> = ref();
  nodes: Nodes = reactive(createNodes());
  status: Ref<Status> = ref("idle");

  static use(): Store {
    return useStore();
  }

  async connect(connection: Connection): Promise<void> {
    await connect(this, connection);
  }

  install(app: App) {
    app.provide(key, this);
  }

  reset() {
    reset(this);
  }
}