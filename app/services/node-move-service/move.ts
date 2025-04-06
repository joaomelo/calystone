import type { Node } from "@/domain";
import type { Status } from "@/utils";

export interface NodeMoveService {
  moveable(node: Node): Status;
  move(options: { subject: Node, target: Node }): Promise<void>;
}
