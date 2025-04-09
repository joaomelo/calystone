import type { Source } from "@/infra/source";

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

  create(source: Source) {
    switch (source) {
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
        const delayInSeconds = this.configurations.memory?.delayInSeconds ?? 1;
        return new MemoryAccessAdapter(delayInSeconds);
      }
      case "one-drive":{
        if (!this.configurations.oneDrive) {
          throwCritical("ONE_DRIVE_CONFIGURATION_NOT_FOUND");
        }
        return new OneDriveAccessAdapter(this.configurations.oneDrive);
      }
    }
  }
}
