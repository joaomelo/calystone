import type { SupportAdapter } from "./support";

export class FsaSupportAdapter implements SupportAdapter {
  access() {
    if (typeof self === "undefined") return false;
    return ("showOpenFilePicker" in self);
  }

  renameDirectory(): boolean {
    return false;
  }

  renameFile() {
    return this.access();
  }
}
