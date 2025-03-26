import type { Id } from "@/domain/id";
import type { Node } from "@/domain/node";

import { Directory } from "@/domain/directory";
import { throwCritical } from "@/utils";
import { reactive } from "vue";

export class Nodes {
  readonly map: Map<Id, Node>;

  constructor() {
    // unfortunately placing this vue wrapper was the only way the ui was able to reactively update nodes updates like opening a directory. if trying to make the internal map reactive in the display store level was not enough to make vue able to detect the nodes data updates.
    this.map = reactive(new Map());
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

  remove(node: Node) {
    this.map.delete(node.id);
    if (node instanceof Directory) {
      for (const child of node.getChildren()) {
        this.remove(child);
      }
    }
  }

  set(node: Node): void {
    this.map.set(node.id, node);
  }

  size() {
    return this.map.size;
  }
}
