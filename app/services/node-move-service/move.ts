import type { Node } from "@/domain";

export interface NodeMoveService {
  support(node: Node): boolean;
  move(options: { subject: Node, target: Node }): Promise<void>;
}
