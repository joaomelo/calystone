import type { Node } from "@/domain";
import type { Status } from "@/utils";

export interface NodeRenameService {
  renameable(node: Node): Status;
  rename(options: { name: string; node: Node }): Promise<void>
}
