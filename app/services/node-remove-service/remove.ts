import type { Node } from "@/domain";
import type { Status } from "@/utils";

export interface NodeRemoveService {
  removeable(node: Node): Status;
  remove(node: Node): Promise<void>
}
