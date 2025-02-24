import type { AccessAdapter } from "@/infra/access-adapters";
import type { SourceAdapter, SupportAdapter } from "@/services";
import type { FileSystemAdapter } from "@/services";

export abstract class BaseSourceAdapter<T> implements SourceAdapter {
  access: AccessAdapter<T>;
  support: SupportAdapter;

  constructor({ access, support }: Options<T>) {
    this.support = support;
    this.access = access;
  }

  abstract performCreateFileSystemAdapter(options: T): FileSystemAdapter;

  requestAccess(): Promise<void> | void {
    return this.access.request();
  }

  async resolveFileSystemAdapter(): Promise<FileSystemAdapter> {
    const options = await this.access.acquire();
    const fileSystemAdapter = this.performCreateFileSystemAdapter(options);
    return fileSystemAdapter;
  }

  resolveSupport(): SupportAdapter {
    return this.support;
  }
}

interface Options<T> {
  support: SupportAdapter;
  access: AccessAdapter<T>;
}