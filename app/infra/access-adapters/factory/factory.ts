import type { SourceProvider } from "@/infra/source";

import { throwCritical } from "@/utils";

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

  create(provider: SourceProvider) {
    switch (provider) {
      case "dropbox":{
        if (!this.configurations.dropbox) {
          throwCritical("DROPBOX_CONFIGURATION_NOT_FOUND");
        }
        return new DropboxAccessAdapter(this.configurations.dropbox);
      }
      case "fsa":{
        return new FsaAccessAdapter();
      }
      case "memory": {
        const delayInMilliseconds = this.configurations.memory?.delayInMilliseconds ?? 0;
        return new MemoryAccessAdapter(delayInMilliseconds);
      }
      case "oneDrive":{
        if (!this.configurations.oneDrive) {
          throwCritical("ONE_DRIVE_CONFIGURATION_NOT_FOUND");
        }
        return new OneDriveAccessAdapter(this.configurations.oneDrive);
      }
    }
  }
}
