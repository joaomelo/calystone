import type { Nodes } from "@/domain/nodes";

import { NodesConnection } from "@/domain/nodes";

import { load } from "./load";

export class FsaNodesConnection extends NodesConnection {
  root: FileSystemDirectoryHandle;

  constructor({ nodes, root }: Options) {
    super(nodes);
    this.root = root;
  }

  async *load() {
    yield* load({ nodes: this.nodes, root: this.root });
  }
}

interface Options {
  root: FileSystemDirectoryHandle;
  nodes: Nodes
}