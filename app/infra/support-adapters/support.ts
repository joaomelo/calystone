import type { Node } from "@/domain";

export interface SupportAdapter {
  access(): boolean;
  rename(node: Node): boolean;
}