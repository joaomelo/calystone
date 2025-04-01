import type { Node } from "@/domain";
import type { Status } from "@/utils";

export interface CreateDirectoryService {
  createbleOn(parent: Node): Status;
  createDirectory(options: { name: string, parent: Node }): Promise<void>
}
