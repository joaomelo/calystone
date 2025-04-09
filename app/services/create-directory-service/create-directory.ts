import type { Directory } from "@/domain";

export interface CreateDirectoryService {
  create(options: { name: string, parent: Directory }): Promise<void>
}
