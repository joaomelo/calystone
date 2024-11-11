import type { Node } from "../node";

export interface Directory extends Node {
  kind: "directory";
};