import type { AdaptersPortfolio, Source } from "@/services";

import { DropboxSourceAdapter, FsaSourceAdapter, MemorySourceAdapter, OneDriveSourceAdapter } from "@/infra/sources-adapters";

import type { BaseAdaptersPortfolioOptions } from "./options";

export class BaseAdaptersPortfolio implements AdaptersPortfolio {
  dropbox: DropboxSourceAdapter;
  fsa: FsaSourceAdapter;
  memory: MemorySourceAdapter;
  oneDrive: OneDriveSourceAdapter;

  constructor(options: BaseAdaptersPortfolioOptions) {
    this.memory = new MemorySourceAdapter(options.memory);
    this.fsa = new FsaSourceAdapter();
    this.dropbox = new DropboxSourceAdapter(options.dropbox);
    this.oneDrive = new OneDriveSourceAdapter(options.oneDrive);
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
