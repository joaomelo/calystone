import type { AccessAdapter, FileSystemAdapter, SourceAdapter, SupportAdapter } from "@/services";

interface Options<T> {
  support: SupportAdapter;
  access: AccessAdapter<T>;
}

export abstract class BaseSourceAdapter<T> implements SourceAdapter<T> {
  accessAdapter: AccessAdapter<T>;
  fileSystemAdapter?: FileSystemAdapter;
  supportAdapter: SupportAdapter;

  constructor({ access, support }: Options<T>) {
    this.supportAdapter = support;
    this.accessAdapter = access;
  }

  abstract createFileSystemAdapter(options: T): FileSystemAdapter;

  getAccess() {
    return this.accessAdapter;
  }

  async getFileSystemAdapter(): Promise<FileSystemAdapter> {
    if (this.fileSystemAdapter) return this.fileSystemAdapter;

    const options = await this.accessAdapter.acquire();
    this.fileSystemAdapter = this.createFileSystemAdapter(options);

    return this.fileSystemAdapter;
  }

  getSupport(): SupportAdapter {
    return this.supportAdapter;
  }
}