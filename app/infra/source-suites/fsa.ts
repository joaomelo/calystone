import { FsaAccess, NullAccess } from "@/infra/access-services";
import { FsaNodesRepository } from "@/infra/nodes-repositories";
import { FsaSupport } from "@/infra/support-services";

import { SourceSuiteBase } from "./base";

export class FsaSuite extends SourceSuiteBase<FileSystemDirectoryHandle>{

  constructor() {
    const support = new FsaSupport();
    const access = support.supports()
      ? new FsaAccess()
      : new NullAccess<FileSystemDirectoryHandle>();
    super({ access, support });
  }

  createRepository(options: FileSystemDirectoryHandle) {
    return new FsaNodesRepository(options);
  }
}