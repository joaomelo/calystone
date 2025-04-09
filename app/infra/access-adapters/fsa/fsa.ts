import { FsaFileSystemAdapter } from "@/infra/files-system-adapters";
import { throwError } from "@/utils";

import type { AccessAdapter } from "../access";

export class FsaAccessAdapter implements AccessAdapter {
  rootHandle?: FileSystemDirectoryHandle;

  acquire() {
    if (!this.rootHandle) throwError("FSA_ACCESS_WITHOUT_ROOT", "the service does not have a root handle to acquire");
    return new FsaFileSystemAdapter(this.rootHandle);
  }

  async request() {
    this.rootHandle = await showDirectoryPicker();
  }
}
