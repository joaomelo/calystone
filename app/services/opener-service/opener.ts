import type { Directory } from "@/domain";

export interface OpenerService {
  openDirectory(directory: Directory): Promise<void>
  openRoots(): Promise<void>
}