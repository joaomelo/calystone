import type { ArtifactData } from "@/domain/artifact";
import type { Id } from "@/domain/ids";
import type { Node } from "@/domain/node";

import { Artifact } from "@/domain/artifact";
import { Directory } from "@/domain/directory";
import { throwCritical } from "@/utils";

import type { NodesRepository } from "./repository";

export class Nodes {

  readonly hash: Map<Id, Node>;
  loading = false;
  repository?: NodesRepository;

  constructor() {
    this.hash = new Map();
  }

  async connect(repository: NodesRepository): Promise<void> {
    this.repository = repository;
    await this.load();
  }

  disconnect(): void {
    this.repository = undefined;
    this.hash.clear();
  }

  async fetchArtifact(id: Id): Promise<ArtifactData> {
    if (!this.repository){
      throwCritical("NO_REPOSITORY", "nodes must have a repository before the load method can be called");
    }
    const data = await this.repository.fetchArtifact(id);
    return data;
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

  async load() {
    if (!this.repository) throwCritical("NO_REPOSITORY", "nodes does not have a repository");

    this.loading = true;
    try {
      this.hash.clear();
      const nodesData = await this.repository.openDirectory();
      for (const data of nodesData) {
        const node: Node = data.kind === "artifact"
          ? new Artifact({ nodes: this, repository: this.repository, ...data })
          : new Directory({ nodes: this, repository: this.repository, ...data });
        this.hash.set(data.id, node);
      }
    } finally {
      this.loading = false;
    }
  }
}
