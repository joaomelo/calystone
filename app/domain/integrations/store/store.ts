import type { Nodes } from "@/domain/nodes";
import type { ConnectionUnion } from "@/domain/specializations";
import type { App, Ref } from "vue";

export interface Store {
  connection: Ref<ConnectionUnion | undefined>;
  install(app: App): void;
  nodes: Nodes;
}