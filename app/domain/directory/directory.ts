import type { NodeDataAndNodes } from "@/domain/node";

import { Node } from "../node";

export class Directory extends Node {
  constructor({ id, name, nodes, parentId }: NodeDataAndNodes) {
    super({ id, name, nodes, parentId });
  }

  children(): Node[] {
    return this.nodes.list().filter(node => node.childrenOf(this));
  }

  descendants(): Node[] {
    return this.nodes.list().filter(node => node.descendantOf(this));
  }
};
