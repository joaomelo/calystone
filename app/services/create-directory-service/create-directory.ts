import type { Node } from "@/domain";

export interface CreateDirectoryService {
  support(): boolean;
  createDirectory(options: { name: string, parent: Node }): Promise<void>
}
