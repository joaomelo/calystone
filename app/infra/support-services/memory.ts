import type { SupportService } from "./support";

export class MemorySupport implements SupportService {
  enabled: boolean;

  constructor(options: Options) {
    this.enabled = options.enabled;
  }

  access(): boolean {
    return this.enabled;
  }

  renameFile() {
    return this.access();
  }

  renameFolder(): boolean {
    return this.access();
  }
}

interface Options {
  enabled: boolean;
}