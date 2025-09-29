import type { Node } from "@/domain/node";

import {
  Artifact,
  TextArtifact,
  TodoArtifact
} from "@/domain/artifact";
import { Directory } from "@/domain/directory";

export function compareNodesByType(a: Node, b: Node): number {
  if (a instanceof Directory && b instanceof Artifact) return -1;
  if (a instanceof Artifact && b instanceof Directory) return 1;

  if (a instanceof TodoArtifact && !(b instanceof TodoArtifact)) return -1;
  if (!(a instanceof TodoArtifact) && b instanceof TodoArtifact) return 1;

  if (a instanceof TextArtifact && !(b instanceof TextArtifact)) return -1;
  if (!(a instanceof TextArtifact) && b instanceof TextArtifact) return 1;

  return 0;
}