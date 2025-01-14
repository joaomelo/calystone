import { FsaAccess } from "@/infra/access-services";
import { FsaNodesRepository } from "@/infra/nodes-repositories";
import { FsaSupport } from "@/infra/support-services";
import { throwError } from "@/utils";

import type { SourceSuite } from "./suite";

export class FsaSuite implements SourceSuite{
  access?: FsaAccess;
  support: FsaSupport;

  constructor() {
    this.support = new FsaSupport();
  }

  repository() {
    if (!this.access) {
      throwError("NO_ACCESS", "Fsa suite has no access service");
    }
    const rootHandle = this.access.acquire();
    return new FsaNodesRepository(rootHandle);
  }

  async request() {
    if (!this.access) {
      this.access = new FsaAccess();
    }
    await this.access.request();
  }

  supports() {
    return this.support.supports();
  }
}