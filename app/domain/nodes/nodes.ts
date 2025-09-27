import type { Id } from "@/domain/id";
import type {
  Node,
  NodeOrId
} from "@/domain/node";

import { isId } from "@/domain/id";
import { throwCritical } from "@/utils";
import { reactive } from "vue";

export class Nodes {
  private _map: Map<Id, Node>;

  constructor() {
    // unfortunately placing this vue wrapper was the only way the ui was able to reactively update nodes updates like opening a directory. if trying to make the internal map reactive in the display store level was not enough to make vue able to detect the nodes data updates.
    this._map = reactive(new Map());
  }

  list(): Node[] {
    return Array.from(this._map.values());
  }

  size() {
    return this._map.size;
  }

  has(nodeOrId: NodeOrId): boolean {
    const id = isId(nodeOrId) ? nodeOrId : nodeOrId.id;
    return this._map.has(id);
  }

  get(nodeOrId?: NodeOrId): Node | undefined {
    if (!nodeOrId) return;

    const id = isId(nodeOrId) ? nodeOrId : nodeOrId.id;
    return this._map.get(id);
  }

  getOrThrow(nodeOrId: NodeOrId): Node {
    const node = this.get(nodeOrId);
    if (!node) throwCritical("NODE_NOT_FOUND");
    return node;
  }

  set(node: Node): void {
    this._map.set(node.id, node);
  }

  delete(nodeOrId: NodeOrId) {
    const id = isId(nodeOrId) ? nodeOrId : nodeOrId.id;
    this._map.delete(id);
  }

}
