import { DropboxSuite, FsaSuite, MemorySuite, OneDriveSuite } from "@/infra/source-suites";

import type { Source, SourcesConfiguration } from "./source";

export class SuitesPortfolio {
  dropbox: DropboxSuite;
  fsa: FsaSuite;
  memory: MemorySuite;
  oneDrive: OneDriveSuite;

  constructor(options: SourcesConfiguration) {
    this.memory = new MemorySuite(options.memory);
    this.fsa = new FsaSuite();
    this.dropbox = new DropboxSuite(options.dropbox);
    this.oneDrive = new OneDriveSuite(options.oneDrive);
  }

  get(source: Source) {
    switch (source) {
      case "dropbox":
        return this.dropbox;
      case "fsa":
        return this.fsa;
      case "memory":
        return this.memory;
      case "one-drive":
        return this.oneDrive;
    }
  }
}