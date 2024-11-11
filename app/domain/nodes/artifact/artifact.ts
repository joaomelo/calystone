import type { Node } from "../node";

export interface Artifact extends Node {
  kind: "artifact";
  lastModified: number;
  mime: string;
  size: number;
}
