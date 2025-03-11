import type { Directory } from "@/domain";

export interface OpenerService {
  openDirectory(directory: Directory): Promise<void>
  openRootDirectories(): Promise<void>
}