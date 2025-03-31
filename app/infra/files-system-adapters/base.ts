import type { DirectoryDataOptions, Id, Node } from "@/domain";

import { Directory } from "@/domain";
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

  abstract createDirectory(options: { name: string, parent: Node }): Promise<void>;
  abstract fetchFileContent(id: Id): Promise<ArrayBuffer>;

  metadataOrThrow(id: Id): Metadata {
    const metadata = this.nodesMetadata.get(id);
    if (metadata === undefined) throwCritical("NO_METADATA");
    return metadata;
  }

  abstract moveNode(options: { subject: Node, target: Node }): Promise<void>;
  abstract openDirectory(id: Id): Promise<ArtifactOrDirectoryDataOptions[]>;
  abstract postFileContent(options: { content: ArrayBuffer; id: Id, }): Promise<void>;

  removeMetadata(node: Node): void {
    this.nodesMetadata.delete(node.id);
    if (node instanceof Directory) {
      for (const child of node.getChildren()) {
        this.removeMetadata(child);
      }
    }
  }

  abstract removeNode(node: Node): Promise<void>;
  abstract renameNode(options: { id: Id, name: string }): Promise<void>;

  reset() {
    this.nodesMetadata.clear();
    this.nodesMetadata.set(this.rootData.id, this.rootMetadata);
  }
}