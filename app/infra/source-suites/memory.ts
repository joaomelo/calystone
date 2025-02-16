import { MemoryAccess, NullAccess } from "@/infra/access-services";
import { MemoryNodesRepository } from "@/infra/nodes-repositories";
import { MemorySupport } from "@/infra/support-services";

import { SourceSuiteBase } from "./base";

export class MemorySuite extends SourceSuiteBase<string> {
  constructor({ enabled }: Options) {
    const support = new MemorySupport({ enabled });
    const access = support.supports()
      ? new MemoryAccess()
      : new NullAccess<string>();
    super({ access, support });
  }

  createRepository(options: string) {
    return new MemoryNodesRepository(options);
  }
}

interface Options {
  enabled: boolean
}