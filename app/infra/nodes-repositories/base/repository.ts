import type { ArtifactData, Id, NodeDataAndKind, NodesRepository } from "@/domain";

import { throwCritical } from "@/utils";

export abstract class NodesRepositoryBase<Metadata> implements NodesRepository {
  nodesMetadata: Map<Id, Metadata>;
  rootData: NodeDataAndKind;
  rootMetadata: Metadata;

  constructor({ rootData, rootMetadata }: Options<Metadata>) {
    this.rootData = rootData;
    this.nodesMetadata = new Map();
    this.rootMetadata = rootMetadata;
    this.reset();
  }

  abstract fetchArtifact(id: Id): Promise<ArtifactData>;

  metadataOrThrow(id: Id): Metadata {
    const metadata = this.nodesMetadata.get(id);
    if (metadata === undefined) throwCritical("NO_METADATA", "the id must correspond to a metadata");
    return metadata;
  }
  abstract openDirectory(id: Id): Promise<NodeDataAndKind[]>;

  abstract postArtifact(id: Id, content: ArrayBuffer): Promise<void>;

  reset() {
    this.nodesMetadata.clear();
    this.nodesMetadata.set(this.rootData.id, this.rootMetadata);
  }
}

interface Options<Metadata> {
  rootData: NodeDataAndKind;
  rootMetadata: Metadata;
}