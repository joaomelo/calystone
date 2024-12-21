import type { Id } from "@/domain/nodes/ids";
import type { Ignore } from "@/domain/nodes/ignore";
import type { Node } from "@/domain/nodes/node";

import { idle, throwCritical } from "@/domain/lang";
import { Artifact, isArtifactData } from "@/domain/nodes/artifact";
import { Directory } from "@/domain/nodes/directory";

import type { NodesRepository } from "./repository";

export class Nodes {

  readonly hash = new Map<Id, Node>();
  ignore?: Ignore;
  loading = false;
  repository?: NodesRepository;

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
      throwCritical("UNABLE_TO_LOAD_NODES_WITHOUT_REPOSITORY", "nodes must have a connection before the load method can be called");
    }

    if (!this.ignore){
      throwCritical("UNABLE_TO_LOAD_NODES_WITHOUT_IGNORE", "nodes must have a ignore definition before the load method can be called");
    }

    this.loading = true;
    try {
      this.hash.clear();
      for await (const data of this.repository.loadNodesData(this.ignore)) {
        await idle();
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
