import type { Nodes } from "@/domain/nodes/nodes";

import type { DirectoryData } from "./data";

import { Node } from "../node";

export class Directory extends Node {
  constructor({ id, name, nodes, parentId }: Options) {
    super({ id, name, nodes, parentId });
  }

  children(): Node[] {
    return this.nodes.list().filter(node => node.childrenOf(this));
  }

  descendants(): Node[] {
    return this.nodes.list().filter(node => node.descendantOf(this));
  }
};

type Options = { nodes: Nodes } & DirectoryData;
