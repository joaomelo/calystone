import type { Artifact } from "@/domain/artifact";

export interface Directory extends Artifact {
  children: Artifact[];
};