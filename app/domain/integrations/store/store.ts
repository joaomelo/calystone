import type { Nodes } from "@/domain/nodes";
import type { Connection } from "@/domain/sources";
import type { App, Ref } from "vue";

export interface Store {
  connection: Ref<Connection | undefined>;
  install(app: App): void;
  nodes: Nodes;
}