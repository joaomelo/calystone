import type { Directory, Node } from "@/domain";
import type { Status } from "@/utils";

export interface CreateFileService {
  createbleOn(parent: Node): Status;
  create(options: { name: string, parent: Directory }): Promise<void>
}
