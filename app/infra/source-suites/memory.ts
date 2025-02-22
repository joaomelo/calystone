import { MemoryAccess, NullAccess } from "@/infra/access-adapters";
import { MemoryNodesRepository } from "@/infra/nodes-repositories";
import { MemorySupport } from "@/infra/support-services";

import { SourceSuite } from "./suite";

export class MemorySuite extends SourceSuite<string> {
  constructor({ enabled }: Options) {
    const support = new MemorySupport({ enabled });
    const access = support.access()
      ? new MemoryAccess()
      : new NullAccess<string>();
    super({ access, support });
  }

  performCreateRepository(options: string) {
    return new MemoryNodesRepository(options);
  }
}

interface Options {
  enabled: boolean
}