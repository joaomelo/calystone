import type { AccessAdapter } from "./access";
import type { FileSystemAdapter } from "./file-system";
import type { SupportAdapter } from "./support";

export interface SourceAdapter<T> {
  getSupport(): SupportAdapter;
  getAccess(): AccessAdapter<T>;
  getOrCreateFileSystemAdapter(): FileSystemAdapter | Promise<FileSystemAdapter>;
  getOrThrowFileSystemAdapter(): FileSystemAdapter;
}