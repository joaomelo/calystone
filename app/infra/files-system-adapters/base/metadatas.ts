import type { Id, Node } from "@/domain";

import { Directory } from "@/domain";
import { throwCritical } from "@/utils";

import type { DirectoryMetadataContainer, FileMetadataContainer, RootMetadataContainer } from "./metadata";

export class Metadatas<R, D, F> {
  private readonly map: Map<Id, DirectoryMetadataContainer<D> | FileMetadataContainer<F> | RootMetadataContainer<R>>;
  private readonly rootContainer: RootMetadataContainer<R>;
  private readonly rootId: Id;

  constructor(options: { rootId: Id, rootMetadata: R }) {
    const { rootId, rootMetadata } = options;
    this.map = new Map();
    this.rootId = rootId;
    this.rootContainer = {
      id: this.rootId,
      kind: "directory",
      metadata: rootMetadata,
      root: true,
    };
    this.reset();
  }

  getOfDirectoryOrThrow(id: Id): DirectoryMetadataContainer<D> | RootMetadataContainer<R> {
    const container = this.getOrThrow(id);
    if (container.kind !== "directory") throwCritical("NO_DIRECTORY_CONTAINER");
    return container;
  }

  getOfFileOrThrow(id: Id): FileMetadataContainer<F> {
    const metadata = this.getOrThrow(id);
    if ((metadata.kind !== "file")) throwCritical("NO_FILE_CONTAINER");
    return metadata;
  }

  getOfRootOrThrow(): RootMetadataContainer<R> {
    return this.rootContainer;
  }

  getOrThrow(id: Id): DirectoryMetadataContainer<D> | FileMetadataContainer<F> | RootMetadataContainer<R> {
    const container = this.map.get(id);
    if (container === undefined) throwCritical("NO_CONTAINER");
    return container;
  }

  remove(node: Node) {
    this.map.delete(node.id);
    if (node instanceof Directory) {
      for (const child of node.getChildren()) {
        this.remove(child);
      }
    }
  }

  reset() {
    this.map.clear();
    this.map.set(this.rootId, this.rootContainer);
  }

  setDirectory(id: Id, metadata: D) {
    this.set(id, {
      id,
      kind: "directory",
      metadata,
    });
  }

  setFile(id: Id, metadata: F) {
    this.set(id, {
      id,
      kind: "file",
      metadata,
    });
  }

  private set(id: Id, metadata: DirectoryMetadataContainer<D> | FileMetadataContainer<F> | RootMetadataContainer<R>) {
    this.map.set(id, metadata);
  }

}