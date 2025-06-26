import type { SourceProvider } from "@/infra/source";

import type { AccessAdapter } from "../access";
import type { AccessConfiguration } from "./configuration";

import { DropboxAccessAdapter } from "../dropbox";
import { FsaAccessAdapter } from "../fsa";
import { MemoryAccessAdapter } from "../memory";
import { OneDriveAccessAdapter } from "../one-drive";

export class AccessAdaptersFactory {
  private readonly configurations: AccessConfiguration;

  constructor(configurations: AccessConfiguration) {
    this.configurations = configurations;
  }

  create(provider: SourceProvider): AccessAdapter<unknown> {
    switch (provider) {
      case "dropbox":{
        return new DropboxAccessAdapter(this.configurations.dropbox);
      }
      case "fsa":{
        return new FsaAccessAdapter();
      }
      case "memory": {
        return new MemoryAccessAdapter(this.configurations.memory.delayInMilliseconds);
      }
      case "oneDrive":{
        return new OneDriveAccessAdapter(this.configurations.oneDrive);
      }
    }
  }
}
