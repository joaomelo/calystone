import type { Node } from "@/domain/node";
import type { SourceResources } from "@/domain/source";

export interface Artifact<ArtifactResources extends SourceResources> extends Node {
  kind: "artifact";
  lastModified: number;
  mime: string;
  resources: ArtifactResources
  size: number;
}
