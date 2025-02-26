import type { Node } from "@/domain";

export interface RenamerService {
  support(node: Node): boolean;
  perform(options: { name: string; node: Node }): Promise<void>
}
