import type { Node } from "@/domain";

export interface SupportAdapter {
  access(): boolean;
  rename(node: Node): boolean;
  remove(node: Node): boolean;
  move(node: Node): boolean;
  createDirectory(): boolean;
  createFile(): boolean;
}