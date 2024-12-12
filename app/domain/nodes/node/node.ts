import type { Directory } from "../directory";
import type { Id } from "../ids";
import type { Nodes } from "../nodes";

import { createId } from "../ids";
import { descendantOf } from "./descendants";
import { path } from "./path";

export class Node {
  readonly id: Id;
  readonly name: string;
  readonly nodes: Nodes;
  readonly parentId?: Id;

  constructor({ name, nodes, parentId }: Options) {
    this.id = createId();
    this.name = name;
    this.parentId = parentId;
    this.nodes = nodes;
  }

  childrenOf(maybeParent: Directory): boolean {
    return this.parentId === maybeParent.id;
  }

  descendantOf(maybeAscendant: Directory): boolean {
    return descendantOf(this, maybeAscendant);
  }

  equal(node: Node): boolean {
    return this.id === node.id;
  }

  parent(): Node | undefined {
    if (!this.parentId) return;
    return this.nodes.getOrThrow(this.parentId);
  }

  path(): string {
    return path(this);
  }

  root(): boolean {
    return !this.parentId;
  }
}

interface Options {
  name: string,
  nodes: Nodes,
  parentId?: Id
};