import type { Nodes } from "@/domain/nodes";
import type { App, Ref } from "vue";

import type { ConnectionUnion } from "../unions";

export interface Store {
  connection: Ref<ConnectionUnion | undefined>;
  install(app: App): void;
  nodes: Nodes;
}