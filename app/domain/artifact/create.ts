import type { Directory } from "@/domain/directory";

import { affiliate } from "@/domain/directory";
import { createId } from "@/utils";

import type { Artifact } from "./artifact";

export function createArtifact(name: string, parent? : Directory): Artifact {
  const artifact: Artifact = {
    id: createId(),
    name: name
  };

  if (parent) {
    affiliate(parent, artifact);
  }

  return artifact;
}