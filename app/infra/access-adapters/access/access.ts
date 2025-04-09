import type { FileSystemAdapter } from "@/infra/files-system-adapters";

export interface AccessAdapter {
  request(): Promise<FileSystemAdapter>;
}