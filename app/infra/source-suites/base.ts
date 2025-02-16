import type { NodesRepository } from "@/domain";
import type { AccessService } from "@/infra/access-services";
import type { SupportService } from "@/infra/support-services";

import type { SourceSuite } from "./suite";

export abstract class SourceSuiteBase<T> implements SourceSuite {
  access: AccessService<T>;
  support: SupportService;

  constructor({ access, support }: Options<T>) {
    this.support = support;
    this.access = access;
  }

  abstract createRepository(options: T): NodesRepository;

  async repository(): Promise<NodesRepository> {
    const options = await this.access.acquire();
    return this.createRepository(options);
  };

  request() {
    return this.access.request();
  };

  supports(): boolean {
    return this.support.supports();
  }
}

interface Options<T> {
  support: SupportService;
  access: AccessService<T>;
}