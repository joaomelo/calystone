import type { Node } from "@/domain";
import type { Status } from "@/utils";

export interface ShareNodeService {
  shareable(node: Node): Status
  share(node: Node): Promise<void>
}
