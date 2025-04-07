export type DropboxConfiguration = CloudConfiguration;

export interface MemoryConfiguration {
  delayInSeconds: number;
  enabled: boolean;
}

export type OneDriveConfiguration = CloudConfiguration;

export interface SourceConfigurations {
  memory: MemoryConfiguration;
  oneDrive: OneDriveConfiguration;
  dropbox: DropboxConfiguration;
}

interface CloudConfiguration {
  clientId: string | undefined;
  redirectUrl: string | undefined;
}