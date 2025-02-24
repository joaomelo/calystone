import type { Source, SourceAdaptersPortfolio } from "@/services";

import { DropboxSourceAdapter, FsaSourceAdapter, MemorySourceAdapter, OneDriveSourceAdapter } from "@/infra/sources-adapters";

import type { BaseSourceAdaptersPortfolioOptions } from "./options";

export class BaseSourceAdaptersPortfolio implements SourceAdaptersPortfolio {
  dropbox: DropboxSourceAdapter;
  fsa: FsaSourceAdapter;
  memory: MemorySourceAdapter;
  oneDrive: OneDriveSourceAdapter;

  constructor(options: BaseSourceAdaptersPortfolioOptions) {
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
