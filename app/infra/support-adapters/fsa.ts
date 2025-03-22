import type { Node } from "@/domain";

import { Directory } from "@/domain";

import type { SupportAdapter } from "./support";

export class FsaSupportAdapter implements SupportAdapter {
  access() {
    if (typeof self === "undefined") return false;
    return ("showOpenFilePicker" in self);
  }

  rename(node: Node) {
    if (node instanceof Directory) return false;
    return this.access();
  }

  renameNode(): boolean {
    return false;
  }
}
