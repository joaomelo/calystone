import type { SupportAdapter } from "@/services";

export class FsaSupportAdapter implements SupportAdapter {
  access() {
    if (typeof self === "undefined") return false;
    return ("showOpenFilePicker" in self);
  }

  renameFile() {
    return this.access();
  }

  renameFolder(): boolean {
    return false;
  }
}
