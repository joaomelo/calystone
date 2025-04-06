import { MemoryAccessAdapter, NullAccessAdapter } from "@/infra/access-adapters";
import { MemoryFileSystemAdapter } from "@/infra/files-system-adapters";
import { MemorySupportAdapter } from "@/infra/support-adapters";

import { BaseSourceAdapter } from "./base";

interface Options {
  delayInSeconds: number;
  enabled: boolean;
}

export class MemorySourceAdapter extends BaseSourceAdapter<string> {
  private readonly delayInSeconds: number;

  constructor({ delayInSeconds, enabled }: Options) {
    const support = new MemorySupportAdapter({ enabled });
    const access = support.access().isOk()
      ? new MemoryAccessAdapter(delayInSeconds)
      : new NullAccessAdapter<string>();
    super({ access, support });
    this.delayInSeconds = delayInSeconds;
  }

  performCreateFileSystemAdapter(rootDirectoryName: string) {
    return new MemoryFileSystemAdapter({ delayInSeconds: this.delayInSeconds, rootDirectoryName });
  }
}