import type { Node } from "@/domain";

export interface NodeRemoveService {
  support(node: Node): boolean;
  remove(node: Node): Promise<void>
}
