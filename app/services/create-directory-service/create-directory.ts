import type { Directory, Node } from "@/domain";
import type { Status } from "@/utils";

export interface CreateDirectoryService {
  createbleOn(parent: Node): Status;
  createDirectory(options: { name: string, parent: Directory }): Promise<void>
}
