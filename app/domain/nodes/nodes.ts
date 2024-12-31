import type { Id } from "@/domain/ids";
import type { Node } from "@/domain/node";

import { createNode } from "@/domain/factory";
import { throwCritical } from "@/utils";

import type { NodesRepository } from "./repository";

import { Scheduler } from "./scheduler";

export class Nodes {
  readonly hash: Map<Id, Node>;
  loading = false;
  repository?: NodesRepository;
  scheduler: Scheduler;

  constructor() {
    this.hash = new Map();
    this.scheduler = new Scheduler();
  }

  connect(repository: NodesRepository): void {
    this.disconnect();
    this.repository = repository;
    const data = repository.clearAndfetchRoot();
    const rootDirectory = createNode({ nodes: this, ...data });
    this.set(rootDirectory);
    this.scheduler.schedule(rootDirectory, true);
    this.scheduler.start();
  }

  disconnect(): void {
    this.repository = undefined;
    this.hash.clear();
    this.scheduler.stop();
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

  reconnect(): void {
    const repository = this.repositoryOrThrow();
    this.connect(repository);
  }

  repositoryOrThrow(): NodesRepository {
    if (!this.repository) throwCritical("NO_REPOSITORY", "nodes does not have a repository");
    return this.repository;
  }

  set(node: Node) {
    this.hash.set(node.id, node);
  }
}
