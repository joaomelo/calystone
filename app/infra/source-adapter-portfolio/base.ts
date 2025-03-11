import { DropboxSourceAdapter, FsaSourceAdapter, MemorySourceAdapter, OneDriveSourceAdapter } from "@/infra/source-adapters";

import type { BaseAdaptersPortfolioOptions } from "./options";
import type { SourceAdapterPortfolio } from "./portfolio";
import type { Source } from "./source";

export class BaseSourceAdapterPortfolio implements SourceAdapterPortfolio {
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
