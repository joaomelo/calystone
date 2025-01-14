import type { SourceSuite } from "@/infra/source-suites";
import type { Configuration } from "@/utils";

import { DropboxSuite, FsaSuite, GoogleDriveSuite, MemorySuite, OneDriveSuite } from "@/infra/source-suites";

export type Source = "dropbox" | "fsa" | "googleDrive" | "memory" | "oneDrive";

export class SuitesPortfolio {
  dropbox: DropboxSuite;
  fsa: FsaSuite;
  googleDrive: GoogleDriveSuite;
  memory: MemorySuite;
  oneDrive: OneDriveSuite;

  constructor(configuration: Configuration) {
    this.dropbox = new DropboxSuite();
    this.googleDrive = new GoogleDriveSuite();
    this.fsa = new FsaSuite();
    this.memory = new MemorySuite(configuration);
    this.oneDrive = new OneDriveSuite(configuration);
  }

  get(source: Source): SourceSuite {
    switch (source) {
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