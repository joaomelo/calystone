import type { SourceSuite } from "@/infra/source-suites";

import { DropboxSuite, FsaSuite, GoogleDriveSuite, MemorySuite, OneDriveSuite } from "@/infra/source-suites";

import type { Source, SourcesConfiguration } from "./source";

export class SuitesPortfolio {
  dropbox: DropboxSuite;
  fsa: FsaSuite;
  googleDrive: GoogleDriveSuite;
  memory: MemorySuite;
  oneDrive: OneDriveSuite;

  constructor(options: SourcesConfiguration) {
    this.memory = new MemorySuite(options.memory);
    this.fsa = new FsaSuite();
    this.dropbox = new DropboxSuite(options.dropbox);
    this.googleDrive = new GoogleDriveSuite(options.googleDrive);
    this.oneDrive = new OneDriveSuite(options.oneDrive);
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