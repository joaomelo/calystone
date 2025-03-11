import type { AccessAdapter } from "@/infra/access-adapters";
import type { FileSystemAdapter } from "@/infra/files-system-adapters";
import type { SupportAdapter } from "@/infra/support-adapters";

export interface SourceAdapter<T> {
  getSupport(): SupportAdapter;
  getAccess(): AccessAdapter<T>;
  getOrCreateFileSystemAdapter(): FileSystemAdapter | Promise<FileSystemAdapter>;
  getOrThrowFileSystemAdapter(): FileSystemAdapter;
}