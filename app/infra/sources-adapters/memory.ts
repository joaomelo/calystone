import { MemoryAccessAdapter, NullAccessAdapter } from "@/infra/access-adapters";
import { MemoryFileSystemAdapter } from "@/infra/files-system-adapter";
import { MemorySupportAdapter } from "@/infra/support-adapters";

import { BaseSourceAdapter } from "./base";

export class MemorySourceAdapter extends BaseSourceAdapter<string> {
  constructor({ enabled }: Options) {
    const support = new MemorySupportAdapter({ enabled });
    const access = support.access()
      ? new MemoryAccessAdapter()
      : new NullAccessAdapter<string>();
    super({ access, support });
  }

  performCreateFileSystemAdapter(options: string) {
    return new MemoryFileSystemAdapter(options);
  }
}

interface Options {
  enabled: boolean
}