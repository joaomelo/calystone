import type {
  Id,
  Node,
  Nodes
} from "@/domain";

import {
  Descendancy,
  Directory
} from "@/domain";
import { throwCritical } from "@/utils";

import type {
  DirectoryMetadataContainer,
  FileMetadataContainer
} from "./metadata";

export class Metadatas<DirectoryMetadata, FileMetadata> {
  private readonly map: Map<Id, DirectoryMetadataContainer<DirectoryMetadata> | FileMetadataContainer<FileMetadata>>;
  private readonly nodes: Nodes;

  constructor({
    nodes,
    rootId,
    rootMetadata
  }: {
    nodes: Nodes;
    rootId: Id,
    rootMetadata: DirectoryMetadata,
  }) {
    this.nodes = nodes;

    this.map = new Map();
    const rootContainer: DirectoryMetadataContainer<DirectoryMetadata> = {
      id: rootId,
      kind: "directory",
      metadata: rootMetadata,
    };
    this.map.set(rootId, rootContainer);
  }

  clear(directory: Directory) {
    this.removeDescendants(directory);
  }

  getOfDirectoryOrThrow(id: Id): DirectoryMetadataContainer<DirectoryMetadata> {
    const container = this.getOrThrow(id);
    if (container.kind !== "directory") throwCritical("NO_DIRECTORY_CONTAINER");
    return container;
  }

  getOfFileOrThrow(id: Id): FileMetadataContainer<FileMetadata> {
    const metadata = this.getOrThrow(id);
    if ((metadata.kind !== "file")) throwCritical("NO_FILE_CONTAINER");
    return metadata;
  }

  getOrThrow(id: Id): DirectoryMetadataContainer<DirectoryMetadata> | FileMetadataContainer<FileMetadata> {
    const container = this.map.get(id);
    if (container === undefined) throwCritical("NO_CONTAINER");
    return container;
  }

  remove(node: Node) {
    this.map.delete(node.id);
    if (node instanceof Directory) {
      this.removeDescendants(node);
    }
  }

  set(container: DirectoryMetadataContainer<DirectoryMetadata> | FileMetadataContainer<FileMetadata>) {
    this.map.set(container.id, container);
  }

  setDirectory({
    id,
    metadata
  }: {
    id: Id,
    metadata: DirectoryMetadata
  }) {
    this.set({
      id,
      kind: "directory",
      metadata,
    });
  }

  setFile({
    id,
    metadata
  }: {
    id: Id,
    metadata: FileMetadata
  }) {
    this.set({
      id,
      kind: "file",
      metadata,
    });
  }

  private removeDescendants(directory: Directory) {
    const descendancy = new Descendancy(this.nodes);
    const descendants = descendancy.descendants(directory);
    for (const descendant of descendants) {
      this.map.delete(descendant.id);
    }
  }

}