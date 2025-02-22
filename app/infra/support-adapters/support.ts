export interface SupportAdapter {
  access(): boolean;
  renameFile(): boolean;
  renameFolder(): boolean;
}