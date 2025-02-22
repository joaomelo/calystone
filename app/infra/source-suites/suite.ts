import type { NodesRepository } from "@/domain";
import type { AccessAdapter } from "@/infra/access-adapters";
import type { SupportAdapter } from "@/infra/support-adapters";

export abstract class SourceSuite<T> {
  access: AccessAdapter<T>;
  support: SupportAdapter;

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
  support: SupportAdapter;
  access: AccessAdapter<T>;
}