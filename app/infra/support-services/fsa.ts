import type { SupportService } from "./service";

export class FsaSupport implements SupportService {
  supports() {
    if (typeof self === "undefined") return false;
    return ("showOpenFilePicker" in self);
  }
}
