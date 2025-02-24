import type { DirectoryDataOptions, Id } from "@/domain";
import type { ArtifactOrDirectoryDataOptions, FileSystemAdapter } from "@/services";

import { throwCritical } from "@/utils";

export abstract class FileSystemBaseAdapter<Metadata> implements FileSystemAdapter {
  nodesMetadata: Map<Id, Metadata>;
  rootData: DirectoryDataOptions;
  rootMetadata: Metadata;

  constructor({ rootData, rootMetadata }: Options<Metadata>) {
    this.rootData = rootData;
    this.nodesMetadata = new Map();
    this.rootMetadata = rootMetadata;
    this.reset();
  }

  abstract fetchFileContent(id: Id): Promise<ArrayBuffer>;

  metadataOrThrow(id: Id): Metadata {
    const metadata = this.nodesMetadata.get(id);
    if (metadata === undefined) throwCritical("NO_METADATA", "the id does not matched a metadata record in the nodes adapter");
    return metadata;
  }

  abstract openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]>;

  abstract postFileContent(id: Id, content: ArrayBuffer): Promise<void>;

  reset() {
    this.nodesMetadata.clear();
    this.nodesMetadata.set(this.rootData.id, this.rootMetadata);
  }
}

interface Options<Metadata> {
  rootData: DirectoryDataOptions;
  rootMetadata: Metadata;
}