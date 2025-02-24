export interface BaseSourceAdaptersPortfolioOptions {
  memory: MemoryOptions;
  oneDrive: CloudOptions;
  dropbox: CloudOptions;
}

interface CloudOptions {
  clientId: string | undefined;
  redirectUrl: string | undefined;
}

interface MemoryOptions {
  enabled: boolean;
}