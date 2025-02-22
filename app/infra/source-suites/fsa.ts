import { FsaAccess, NullAccess } from "@/infra/access-adapters";
import { FsaNodesRepository } from "@/infra/nodes-repositories";
import { FsaSupport } from "@/infra/support-adapters";

import { SourceSuite } from "./suite";

export class FsaSuite extends SourceSuite<FileSystemDirectoryHandle>{

  constructor() {
    const support = new FsaSupport();
    const access = support.access()
      ? new FsaAccess()
      : new NullAccess<FileSystemDirectoryHandle>();
    super({ access, support });
  }

  performCreateRepository(options: FileSystemDirectoryHandle) {
    return new FsaNodesRepository(options);
  }
}