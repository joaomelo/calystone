import type { FileSystemAdapter } from "@/infra/files-system-adapters";
import type { ShareAdapter } from "@/infra/share-adapters";

export interface SourceAdapter extends FileSystemAdapter, ShareAdapter {
  request(): Promise<void> | void;
}