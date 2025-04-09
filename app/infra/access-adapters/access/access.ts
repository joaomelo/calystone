import type { FileSystemAdapter } from "@/infra/files-system-adapters";

export interface AccessAdapter {
  request(): Promise<void> | void;
  acquire(): FileSystemAdapter | Promise<FileSystemAdapter>;
}