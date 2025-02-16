import type { SupportService } from "./service";

export class MemorySupport implements SupportService {
  enabled: boolean;

  constructor(options: Options) {
    this.enabled = options.enabled;
  }

  supports() {
    return this.enabled;
  }
}

interface Options {
  enabled: boolean;
}