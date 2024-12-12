import type { Id } from "@/domain/nodes/ids";
import type { Nodes } from "@/domain/nodes/nodes";

import { Node } from "../node";

export class Directory extends Node {
  constructor({ name, nodes, parentId }: Options) {
    super({ name, nodes, parentId });
  }

  children(): Node[] {
    return this.nodes.list().filter(node => node.childrenOf(this));
  }

  descendants(): Node[] {
    return this.nodes.list().filter(node => node.descendantOf(this));
  }
};

interface Options {
  name: string,
  nodes: Nodes,
  parentId?: Id
};