import type { Directory } from "@/domain";

export interface DirectoryOpenService {
  open(directory: Directory): Promise<void>
  openRoots(): Promise<void>
}