import type { Node } from "@/domain";
import type { Status } from "@/utils";

export interface ShareAdapter {
  shareable(node: Node): Status;
  share(node: Node): Promise<void>
}