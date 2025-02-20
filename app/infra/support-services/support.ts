export interface SupportService {
  access(): boolean;
  renameFile(): boolean;
  renameFolder(): boolean;
}