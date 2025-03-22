import type { DirectoryDataOptions, Id } from "@/domain";

import { throwCritical } from "@/utils";

import type { ArtifactOrDirectoryDataOptions, FileSystemAdapter } from "./file-system";

interface Options<Metadata> {
  rootData: DirectoryDataOptions;
  rootMetadata: Metadata;
}

export abstract class BaseFileSystemAdapter<Metadata> implements FileSystemAdapter {
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

  abstract postFileContent(options: { content: ArrayBuffer; id: Id, }): Promise<void>;

  abstract renameNode(options: { id: Id, name: string }): Promise<void>;

  reset() {
    this.nodesMetadata.clear();
    this.nodesMetadata.set(this.rootData.id, this.rootMetadata);
  }
}