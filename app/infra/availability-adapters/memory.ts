import type { MemoryConfiguration } from "@/infra/source";

import { Status } from "@/utils";

import type { AvailabilityAdapter } from "./availability";

export class MemoryAvailabilityAdapter implements AvailabilityAdapter {
  private readonly enabled: boolean;

  constructor(options: MemoryConfiguration) {
    this.enabled = options.enabled;
  }

  available(): Status {
    if (!this.enabled) return Status.fail("MEMORY_NOT_ENABLED");
    return Status.ok();
  }
}