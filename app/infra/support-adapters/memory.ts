import type { SupportAdapter } from "./support";

export class MemorySupport implements SupportAdapter {
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