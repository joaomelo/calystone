import type { Id } from "@/domain/ids";
import type { Node } from "@/domain/node";

import { createNode } from "@/domain/factory";
import { throwCritical } from "@/utils";

import type { NodesRepository } from "./repository";

import { Scheduler } from "./scheduler";

export class Nodes {
  readonly hash: Map<Id, Node>;
  repository: NodesRepository;
  scheduler: Scheduler;

  constructor(repository: NodesRepository) {
    this.hash = new Map();
    this.scheduler = new Scheduler();
    this.repository = repository;
    this.boot();
  }

  boot(): void {
    this.hash.clear();
    this.scheduler.stop();

    const rootData = this.repository.boot();
    const rootDirectory = createNode({ nodes: this, ...rootData });
    this.set(rootDirectory);

    this.scheduler.schedule(rootDirectory, true);
    this.scheduler.start();
  }

  get(id: Id): Node | undefined {
    return this.hash.get(id);
  }

  getOrThrow(id: Id): Node {
    const node = this.get(id);
    if (!node) throwCritical("NODE_NOT_FOUND", `a node with the id "${id}" was not found`);
    return node;
  }

  list(): Node[] {
    return Array.from(this.hash.values());
  }

  set(node: Node) {
    this.hash.set(node.id, node);
  }
}
