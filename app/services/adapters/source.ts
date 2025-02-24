import type { FileSystemAdapter } from "./file-system";
import type { SupportAdapter } from "./support";

export interface SourceAdapter {
  resolveSupport(): SupportAdapter;
  requestAccess(): Promise<void> | void;
  resolveFileSystemAdapter(): FileSystemAdapter | Promise<FileSystemAdapter>;
}