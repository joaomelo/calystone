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

  rename() {
    return this.access();
  }
}