import type { SupportAdapter } from "./support";

interface Options {
  enabled: boolean;
}

export class MemorySupportAdapter implements SupportAdapter {
  enabled: boolean;

  constructor(options: Options) {
    this.enabled = options.enabled;
  }

  access(): boolean {
    return this.enabled;
  }

  renameDirectory(): boolean {
    return this.access();
  }

  renameFile() {
    return this.access();
  }
}