import type { Id, NodeDataAndKind, NodesRepository } from "@/domain";

export abstract class NodesRepositoryBase<Metadata> implements NodesRepository {
  nodesMetadata: Map<Id, Metadata>;
  rootData: NodeDataAndKind;
  rootMetadata: Metadata;

  constructor(rootData: NodeDataAndKind, rootMetadata: Metadata) {
    this.rootData = rootData;
    this.nodesMetadata = new Map();
    this.rootMetadata = rootMetadata;
    this.reset();
  }

  abstract openDirectory(id: Id): Promise<NodeDataAndKind[]>;

  reset() {
    this.nodesMetadata.clear();
    this.nodesMetadata.set(this.rootData.id, this.rootMetadata);
  }

}