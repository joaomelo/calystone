import type { Node } from "@/domain";

// support adapters care only about the source support of the operation, it does not care about domain or service rules. methods should only receive parameters and evalute logic if related  to infra support concerns. other validations should be done in the domain or service layer.
export interface SupportAdapter {
  access(): boolean;
  rename(node: Node): boolean;
  remove(node: Node): boolean;
  move(node: Node): boolean;
  createDirectory(): boolean;
  createArtifact(): boolean;
}