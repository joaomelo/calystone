import type { Configuration } from "@/utils";

import type { SupportService } from "./service";

export class MemorySupport implements SupportService {
  enableMemory: boolean;

  constructor(configuration: Configuration) {
    this.enableMemory = configuration.is("enableMemory");
  }

  supports() {
    return this.enableMemory;
  }
}