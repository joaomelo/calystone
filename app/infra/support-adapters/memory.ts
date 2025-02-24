import type { SupportAdapter } from "@/services";

export class MemorySupportAdapter implements SupportAdapter {
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