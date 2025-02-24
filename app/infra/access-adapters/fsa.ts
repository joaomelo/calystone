import type { AccessAdapter } from "@/services";

import { throwError } from "@/utils";

export class FsaAccessAdapter implements AccessAdapter<FileSystemDirectoryHandle> {
  rootHandle?: FileSystemDirectoryHandle;

  acquire() {
    if (!this.rootHandle) throwError("FSA_ACCESS_WITHOUT_ROOT", "the service does not have a root handle to acquire");
    return this.rootHandle;
  }

  async request() {
    this.rootHandle = await showDirectoryPicker();
  }
}
