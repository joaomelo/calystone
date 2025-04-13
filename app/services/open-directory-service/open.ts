import type { Directory } from "@/domain";

export interface OpenDirectoryService {
  open(directory: Directory): Promise<void>
  openRoots(): Promise<void>
}