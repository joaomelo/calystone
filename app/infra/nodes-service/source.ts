export type Source = "dropbox" | "fsa" | "google-drive" | "memory" | "one-drive";

export interface SourcesConfiguration {
  memory: MemoryConfiguration;
  oneDrive: CloudConfiguration;
  googleDrive: CloudConfiguration;
  dropbox: CloudConfiguration;
}

interface MemoryConfiguration {
  enabled: boolean;
}

interface CloudConfiguration {
  clientId: string | undefined;
  redirectUrl: string | undefined;
}