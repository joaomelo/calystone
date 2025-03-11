import type { Directory } from "@/domain";

export interface DirectoryOpenerService {
  open(directory: Directory): Promise<void>
  openRoots(): Promise<void>
}