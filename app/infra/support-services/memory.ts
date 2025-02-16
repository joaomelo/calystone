import type { SupportService } from "./service";

export class MemorySupport implements SupportService {
  enableMemory: boolean;

  constructor(options: Options) {
    this.enableMemory = typeof options?.enableMemory === "boolean" ? options.enableMemory : false;
  }

  supports() {
    return this.enableMemory;
  }
}

type Options = {
  enableMemory: unknown;
} | undefined;