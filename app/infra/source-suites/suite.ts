import type { NodesRepository } from "@/domain";
import type { AccessAdapter } from "@/infra/access-adapters";
import type { SupportService } from "@/infra/support-services";

export abstract class SourceSuite<T> {
  access: AccessAdapter<T>;
  support: SupportService;

  constructor({ access, support }: Options<T>) {
    this.support = support;
    this.access = access;
  }

  async createRepository(): Promise<NodesRepository> {
    const options = await this.access.acquire();
    return this.performCreateRepository(options);
  }

  abstract performCreateRepository(options: T): NodesRepository;;
}

interface Options<T> {
  support: SupportService;
  access: AccessAdapter<T>;
}