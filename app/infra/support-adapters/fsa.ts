import type { Node } from "@/domain";

import { Directory } from "@/domain";

import type { SupportAdapter } from "./support";

export class FsaSupportAdapter implements SupportAdapter {
  access() {
    return this.isFileSystemAccessSupported();
  }

  move(subject: Node) {
    if (subject.isRoot()) return false;
    if (subject instanceof Directory) return false;
    return this.isFileSystemAccessSupported();
  }

  remove(node: Node) {
    if (node.isRoot()) return false;
    return this.isFileSystemAccessSupported();
  }

  rename(node: Node) {
    if (node instanceof Directory) return false;
    return this.isFileSystemAccessSupported();
  }

  private isFileSystemAccessSupported() {
    if (typeof self === "undefined") return false;
    return ("showOpenFilePicker" in self);
  }
}
