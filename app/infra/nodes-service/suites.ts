import type { SourceSuite } from "@/infra/source-suites";
import type { Configuration } from "@/utils";

import { DropboxSuite, FsaSuite, GoogleDriveSuite, MemorySuite, OneDriveSuite } from "@/infra/source-suites";

import type { Source } from "./source";

export class SuitesPortfolio {
  dropbox: DropboxSuite;
  fsa: FsaSuite;
  googleDrive: GoogleDriveSuite;
  memory: MemorySuite;
  oneDrive: OneDriveSuite;

  constructor(configuration: Configuration) {
    this.dropbox = new DropboxSuite();
    this.googleDrive = new GoogleDriveSuite(configuration);
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
      case "google-drive":
        return this.googleDrive;
      case "memory":
        return this.memory;
      case "one-drive":
        return this.oneDrive;
    }
  }
}