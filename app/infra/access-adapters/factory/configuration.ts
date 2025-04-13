export interface AccessConfiguration {
  memory?: MemoryConfiguration;
  oneDrive?: OneDriveConfiguration;
  dropbox?: DropboxConfiguration;
}

export type DropboxConfiguration = CloudConfiguration;

export interface MemoryConfiguration {
  delayInMilliseconds: number;
}

export type OneDriveConfiguration = CloudConfiguration;

interface CloudConfiguration {
  clientId: string;
  redirectUrl: string;
}