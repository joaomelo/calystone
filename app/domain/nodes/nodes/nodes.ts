import type { Id } from "@/domain/nodes/ids";
import type { Ignore } from "@/domain/nodes/ignore";
import type { Node } from "@/domain/nodes/node";

import { throwCritical } from "@/domain/lang";
import { Artifact, isArtifactData } from "@/domain/nodes/artifact";
import { Directory } from "@/domain/nodes/directory";

import type { NodesRepository } from "./repository";

export class Nodes {

  readonly hash: Map<Id, Node>;
  readonly ignore: Ignore;
  loading = false;
  repository?: NodesRepository;

  constructor(ignore: Ignore) {
    this.ignore = ignore;
    this.hash = new Map();
  }

  async connect(repository: NodesRepository): Promise<void> {
    this.repository = repository;
    return this.load();
  }

  disconnect(): void {
    this.repository = undefined;
    this.hash.clear();
  }

  get(id: Id): Node | undefined {
    return this.hash.get(id);
  }

  getOrThrow(id: Id): Node {
    const node = this.get(id);
    if (!node){
      throwCritical("NODE_NOT_FOUND", `a node with the id "${id}" was not found`);
    }
    return node;
  }

  list(): Node[] {
    return Array.from(this.hash.values());
  }

  async load(): Promise<void> {
    if (!this.repository){
      throwCritical("NO_REPOSITORY", "nodes must have a repository before the load method can be called");
    }

    this.loading = true;
    try {
      this.hash.clear();
      for await (const data of this.repository.loadNodesData(this.ignore)) {
        const node: Node = (isArtifactData(data))
          ? new Artifact({ nodes: this, ...data })
          : new Directory({ nodes: this, ...data });
        this.hash.set(data.id, node);
      }
    } finally {
      this.loading = false;
    }
  }
}
