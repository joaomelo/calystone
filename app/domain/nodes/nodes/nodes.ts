import { throwCritical } from "@/domain/lang";

import type { Id } from "../ids";
import type { Node } from "../node";
import type { NodesConnection } from "./connection";
import type { Ignore } from "./ignore";

import { getOrThrow } from "./get";

export class Nodes {

  connection?: NodesConnection;
  readonly hash = new Map<Id, Node>();
  ignore: Ignore = [];
  loading = false;

  constructor(ignore: Ignore) {
    this.ignore = ignore;
  }

  async connect(connection: NodesConnection): Promise<void> {
    this.connection = connection;
    return this.load();
  }

  disconnect(): void {
    this.connection = undefined;
    this.hash.clear();
  }

  get(id: Id): Node | undefined {
    return this.hash.get(id);
  }

  getOrThrow(id: Id): Node {
    return getOrThrow(id, this.hash);
  }

  list(): Node[] {
    return Array.from(this.hash.values());
  }

  async load(): Promise<void> {
    if (!this.connection){
      throwCritical("UNABLE_TO_LOAD_NODES_WITHOUT_CONNECTION", "nodes must have a connection before the load method can be called");
      return;
    }

    this.loading = true;
    try {
      this.hash.clear();
      for await (const node of this.connection.load()) {
        this.hash.set(node.id, node);
      }
    } finally {
      this.loading = false;
    }
  }
}
