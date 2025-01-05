import { BaseAccessService } from "../base";

export class FsaAccessService extends BaseAccessService<FileSystemDirectoryHandle> {
  active() {
    if (typeof self === "undefined") return false;
    return ("showOpenFilePicker" in self);
  }

  async performAccess() {
    const dir = await showDirectoryPicker();
    return dir;
  }
}
