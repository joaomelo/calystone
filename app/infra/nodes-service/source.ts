export type Source = "dropbox" | "fsa" | "memory" | "one-drive";

export interface SourcesConfiguration {
  memory: MemoryConfiguration;
  oneDrive: CloudConfiguration;
  dropbox: CloudConfiguration;
}

interface MemoryConfiguration {
  enabled: boolean;
}

interface CloudConfiguration {
  clientId: string | undefined;
  redirectUrl: string | undefined;
}