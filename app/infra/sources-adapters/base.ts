import type { AccessAdapter, FileSystemAdapter, SourceAdapter, SupportAdapter } from "@/services";

interface Options<T> {
  support: SupportAdapter;
  access: AccessAdapter<T>;
}

export abstract class BaseSourceAdapter<T> implements SourceAdapter<T> {
  access: AccessAdapter<T>;
  support: SupportAdapter;

  constructor({ access, support }: Options<T>) {
    this.support = support;
    this.access = access;
  }

  abstract createFileSystemAdapter(options: T): FileSystemAdapter;

  getAccess() {
    return this.access;
  }

  async getFileSystemAdapter(): Promise<FileSystemAdapter> {
    const options = await this.access.acquire();
    const fileSystemAdapter = this.createFileSystemAdapter(options);
    return fileSystemAdapter;
  }

  getSupport(): SupportAdapter {
    return this.support;
  }
}