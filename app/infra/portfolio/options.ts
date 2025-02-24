export interface BaseSourceAdaptersPortfolioOptions {
  memory: MemoryOptions;
  oneDrive: CloudOptions;
  dropbox: CloudOptions;
}

interface MemoryOptions {
  enabled: boolean;
}

interface CloudOptions {
  clientId: string | undefined;
  redirectUrl: string | undefined;
}