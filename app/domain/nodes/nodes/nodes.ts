import type { Id } from "@/utils";

import type { Directory } from "../directory";
import type { Node } from "../node";
import type { NodesConnection } from "./connection";

import { children } from "./children";
import { descendants } from "./descendants";
import { getOrThrow } from "./get";
import { path } from "./path";

export class Nodes {
  connection?: NodesConnection;
  readonly hash = new Map<Id, Node>();
  loading = false;

  children(parentOrId: Directory | Id): Node[] {
    return children(this.list(), parentOrId);
  }

  async connect(connection: NodesConnection): Promise<void> {
    this.loading = true;
    try {
      this.connection = connection;
      this.hash.clear();
      for await (const node of connection.load()) {
        this.hash.set(node.id, node);
      }
    } finally {
      this.loading = false;
    }
  }

  descendants(parentOrId: Directory | Id): Node[] {
    return descendants(this.list(), parentOrId);
  }

  disconnect(): void {
    this.connection = undefined;
    this.hash.clear();
  }

  getOrThrow(id: Id): Node {
    return getOrThrow(id, this.hash);
  }

  list(): Node[] {
    return Array.from(this.hash.values());
  }

  path(nodeOrId: Id | Node): string {
    return path(nodeOrId, this.hash);
  }
}
