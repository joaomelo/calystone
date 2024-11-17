import { NodesConnection } from "@/domain/nodes";

import { load } from "./load";

export class FsaNodesConnection extends NodesConnection {
  root: FileSystemDirectoryHandle;

  constructor(root: FileSystemDirectoryHandle) {
    super();
    this.root = root;
  }

  async *load() {
    yield* load(this.root);
  }
}
