export interface BaseAdaptersPortfolioOptions {
  memory: MemoryOptions;
  oneDrive: CloudOptions;
  dropbox: CloudOptions;
}

interface CloudOptions {
  clientId: string | undefined;
  redirectUrl: string | undefined;
}

interface MemoryOptions {
  delayInSeconds: number;
  enabled: boolean;
}