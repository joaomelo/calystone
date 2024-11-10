import type { Node } from "@/domain/node";

export interface Directory extends Node {
  kind: "directory";
};