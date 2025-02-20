import type { SupportService } from "./support";

export class FsaSupport implements SupportService {
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
