import { Status } from "@/utils";

import type { AvailabilityAdapter } from "../availability";

export class EnabledAvailabilityAdapter implements AvailabilityAdapter {
  private readonly enabled: boolean;

  constructor(enabled: boolean) {
    this.enabled = enabled;
  }

  available(): Status {
    if (!this.enabled) return Status.fail("NOT_ENABLED");
    return Status.ok();
  }
};