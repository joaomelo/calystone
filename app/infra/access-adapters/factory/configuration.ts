export interface AccessConfigurations {
  memory?: MemoryConfiguration;
  oneDrive?: OneDriveConfiguration;
  dropbox?: DropboxConfiguration;
}

export type DropboxConfiguration = CloudConfiguration;

export interface MemoryConfiguration {
  delayInSeconds: number;
}

export type OneDriveConfiguration = CloudConfiguration;

interface CloudConfiguration {
  clientId: string;
  redirectUrl: string;
}