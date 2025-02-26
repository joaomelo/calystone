export interface SupportAdapter {
  access(): boolean;
  renameFile(): boolean;
  renameDirectory(): boolean;
}