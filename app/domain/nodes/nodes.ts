import type { Id } from "@/domain/id";
import type { Node } from "@/domain/node";

import { throwCritical } from "@/utils";

export class Nodes {
  readonly map: Map<Id, Node>;

  constructor() {
    this.map = new Map();
  }

  clear(): void {
    this.map.clear();
  }

  get(id: Id): Node | undefined {
    return this.map.get(id);
  }

  getOrThrow(id: Id): Node {
    const node = this.get(id);
    if (!node) throwCritical("NODE_NOT_FOUND", `a node with the id "${id}" was not found`);
    return node;
  }

  list(): Node[] {
    return Array.from(this.map.values());
  }

  set(node: Node): void {
    this.map.set(node.id, node);
  }

  size() {
    return this.map.size;
  }
}
