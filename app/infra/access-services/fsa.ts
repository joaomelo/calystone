import { throwError } from "@/utils";

import type { AccessService } from "./service";

export class FsaAccessService implements AccessService<FileSystemDirectoryHandle> {
  rootHandle?: FileSystemDirectoryHandle;

  acquire() {
    if (!this.rootHandle) throwError("FSA_ACCESS_WITHOUT_ROOT", "the service does not have a root handle to acquire");
    return this.rootHandle;
  }

  async request() {
    this.rootHandle = await showDirectoryPicker();
  }
}
