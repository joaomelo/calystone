import type { Id, Node, Nodes } from "@/domain";

import { Descendancy } from "@/domain";
import { Directory } from "@/domain";
import { throwCritical } from "@/utils";

import type { DirectoryMetadataContainer, FileMetadataContainer, RootMetadataContainer } from "./metadata";

export class Metadatas<R, D, F> {
  private readonly map: Map<Id, DirectoryMetadataContainer<D> | FileMetadataContainer<F> | RootMetadataContainer<R>>;
  private readonly nodes: Nodes;
  private readonly rootContainer: RootMetadataContainer<R>;
  private readonly rootId: Id;

  constructor(options: { nodes: Nodes; rootId: Id, rootMetadata: R, }) {
    this.map = new Map();

    const { nodes, rootId, rootMetadata } = options;
    this.nodes = nodes;
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
      const descendancy = new Descendancy({ directory: node, nodes: this.nodes });
      for (const child of descendancy.descendants()) {
        this.remove(child);
      }
    }
  }

  reset() {
    this.map.clear();
    this.map.set(this.rootId, this.rootContainer);
  }

  set(container: DirectoryMetadataContainer<D> | FileMetadataContainer<F>) {
    this.map.set(container.id, container);
  }

  setDirectory(options: { id: Id, metadata: D }) {
    const { id, metadata } = options;
    this.set({
      id,
      kind: "directory",
      metadata,
    });
  }

  setFile(options: { id: Id, metadata: F }) {
    const { id, metadata } = options;
    this.set({
      id,
      kind: "file",
      metadata,
    });
  }

}