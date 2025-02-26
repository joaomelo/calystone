import type { AccessAdapter, FileSystemAdapter, SourceAdapter, SupportAdapter } from "@/services";

import { throwCritical } from "@/utils";

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

  async getOrCreateFileSystemAdapter(): Promise<FileSystemAdapter> {
    if (this.fileSystemAdapter) return this.fileSystemAdapter;

    const options = await this.accessAdapter.acquire();
    this.fileSystemAdapter = this.createFileSystemAdapter(options);

    return this.fileSystemAdapter;
  }

  getOrThrowFileSystemAdapter(): FileSystemAdapter {
    if (!this.fileSystemAdapter) throwCritical("NO_FILE_SYSTEM_ADAPTER", "the source adapter could not found a file system adapter");
    return this.fileSystemAdapter;
  }

  getSupport(): SupportAdapter {
    return this.supportAdapter;
  }
}