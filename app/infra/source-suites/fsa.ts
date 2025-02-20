import { FsaAccess, NullAccess } from "@/infra/access-services";
import { FsaNodesRepository } from "@/infra/nodes-repositories";
import { FsaSupport } from "@/infra/support-services";

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