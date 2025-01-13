import type { ArtifactData, Id, NodeDataAndKind, NodesRepository } from "@/domain";

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

  abstract fetchArtifact(id: Id): Promise<ArtifactData>;
  abstract openDirectory(id: Id): Promise<NodeDataAndKind[]>;
  abstract postArtifact(id: Id, content: ArrayBuffer): Promise<void>;

  reset() {
    this.nodesMetadata.clear();
    this.nodesMetadata.set(this.rootData.id, this.rootMetadata);
  }
}