import type { Configuration } from "@/utils";

import { MemoryAccess } from "@/infra/access-services";
import { MemoryNodesRepository } from "@/infra/nodes-repositories";
import { MemorySupport } from "@/infra/support-services";
import { throwError } from "@/utils";

import type { SourceSuite } from "./suite";

export class MemorySuite implements SourceSuite {
  access?: MemoryAccess;
  support: MemorySupport;

  constructor(configuration: Configuration) {
    this.support = new MemorySupport(configuration);
  }

  repository() {
    if (!this.access) {
      throwError("NO_ACCESS", "memory suite has no access service");
    }
    const rootDirectoryName = this.access.acquire();
    return new MemoryNodesRepository(rootDirectoryName);
  }

  request() {
    if (!this.access) {
      this.access = new MemoryAccess();
    }
    this.access.request();
  }

  supports() {
    return this.support.supports();
  }
}