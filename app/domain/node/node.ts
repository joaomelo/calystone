import type { Directory } from "../directory";
import type { Id } from "../ids";
import type { Nodes, NodesRepository } from "../nodes";
import type { NodeData } from "./data";
import type { Status } from "./status";

import { descendantOf } from "./descendants";
import { path } from "./path";

export type Options = { nodes: Nodes, repository: NodesRepository } & NodeData;

export abstract class Node {
  readonly id: Id;
  readonly name: string;
  readonly nodes: Nodes;
  readonly parentId?: Id;
  readonly repository: NodesRepository;
  status: Status = "unloaded";

  constructor({ id, name, nodes, parentId, repository }: Options) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
    this.nodes = nodes;
    this.repository = repository;
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

  async load(): Promise<void> {
    this.status = "loading";
    try {
      await this.performLoad();
    } finally {
      this.status = "loaded";
    }
  }

  parent(): Node | undefined {
    if (!this.parentId) return;
    return this.nodes.getOrThrow(this.parentId);
  }

  path(): string {
    return path(this);
  }

  abstract performLoad(): Promise<void>;

  root(): boolean {
    return !this.parentId;
  }
}
