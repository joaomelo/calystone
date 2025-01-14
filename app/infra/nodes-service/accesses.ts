import type { Configuration } from "@/utils";

import { DropboxAccessService, FsaAccessService, GoogleIdentityAccessService, MemoryAccessService, MsalAccessService } from "@/infra/access-services";

export type AccessName = "dropbox" | "fsa" | "googleDrive" | "memory" | "oneDrive";

export class AccessesPortfolio {
  dropbox: DropboxAccessService;
  fsa: FsaAccessService;
  googleDrive: GoogleIdentityAccessService;
  memory: MemoryAccessService;
  oneDrive: MsalAccessService;

  constructor(configuration: Configuration){
    this.dropbox = new DropboxAccessService();
    this.googleDrive = new GoogleIdentityAccessService();
    this.fsa = new FsaAccessService();
    this.memory = new MemoryAccessService(configuration);
    this.oneDrive = new MsalAccessService(configuration);
  }

  get(name: AccessName) {
    switch (name) {
      case "dropbox":
        return this.dropbox;
      case "fsa":
        return this.fsa;
      case "googleDrive":
        return this.googleDrive;
      case "memory":
        return this.memory;
      case "oneDrive":
        return this.oneDrive;
    }
  }
}