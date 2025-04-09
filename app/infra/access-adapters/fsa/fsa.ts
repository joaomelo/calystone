import { FsaFileSystemAdapter } from "@/infra/files-system-adapters";

import type { AccessAdapter } from "../access";

export class FsaAccessAdapter implements AccessAdapter {

  async request() {
    const rootHandle = await showDirectoryPicker();
    return new FsaFileSystemAdapter(rootHandle);
  }
}
