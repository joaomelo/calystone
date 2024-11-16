import { Connection } from "@/domain/connection";

import { load } from "../load";

export class FsaConnection extends Connection {
  root: FileSystemDirectoryHandle;

  constructor(root: FileSystemDirectoryHandle) {
    super();
    this.root = root;
  }

  async *load() {
    yield* load(this.root);
  }
}
