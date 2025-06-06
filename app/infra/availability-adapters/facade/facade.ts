import type { SourceProvider } from "@/infra/source";

import type { Options } from "./options";

import { EnabledAvailabilityAdapter } from "../enabled";
import { FsaAvailabilityAdapter } from "../fsa";

export class AvailabilityFacade {
  private readonly dropbox: EnabledAvailabilityAdapter;
  private readonly fsa: FsaAvailabilityAdapter;
  private readonly memory: EnabledAvailabilityAdapter;
  private readonly oneDrive: EnabledAvailabilityAdapter;

  constructor(options: Options) {
    this.dropbox = new EnabledAvailabilityAdapter(options.dropbox);
    this.fsa = new FsaAvailabilityAdapter();
    this.memory = new EnabledAvailabilityAdapter(options.memory);
    this.oneDrive = new EnabledAvailabilityAdapter(options.oneDrive);
  }

  available(provider: SourceProvider) {
    switch (provider) {
      case "dropbox":
        return this.dropbox.available();
      case "fsa":
        return this.fsa.available();
      case "memory":
        return this.memory.available();
      case "oneDrive":
        return this.oneDrive.available();
    }
  }
}
