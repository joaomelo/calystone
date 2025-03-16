import { FsaAccessAdapter, NullAccessAdapter } from "@/infra/access-adapters";
import { FsaFileSystemAdapter } from "@/infra/files-system-adapters";
import { FsaSupportAdapter } from "@/infra/support-adapters";

import { BaseSourceAdapter } from "./base";

export class FsaSourceAdapter extends BaseSourceAdapter<FileSystemDirectoryHandle>{

  constructor() {
    const support = new FsaSupportAdapter();
    const access = support.access()
      ? new FsaAccessAdapter()
      : new NullAccessAdapter<FileSystemDirectoryHandle>();
    super({ access, support });
  }

  performCreateFileSystemAdapter(options: FileSystemDirectoryHandle) {
    return new FsaFileSystemAdapter(options);
  }
}