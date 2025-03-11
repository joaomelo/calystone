import type { Node } from "@/domain";

export interface NodeRenameService {
  support(node: Node): boolean;
  rename(options: { name: string; node: Node }): Promise<void>
}
