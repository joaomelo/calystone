import type { Directory, Node } from "@/domain";

export interface NodeMoveService {
  support(node: Node): boolean;
  move(options: { subject: Node, target: Directory }): Promise<void>;
}
