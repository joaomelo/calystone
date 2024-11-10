import type { MediaResources } from "@/domain/media";
import type { Node } from "@/domain/node";

export interface Artifact<Resources extends MediaResources> extends Node {
  kind: "artifact";
  lastModified: number;
  mime: string;
  resources: Resources
  size: number;
}
