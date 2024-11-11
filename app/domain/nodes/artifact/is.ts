import type { Artifact } from "./artifact";

import { isNode } from "../node";

export function isArtifact(value: unknown): value is Artifact {
  if (!isNode(value)) return false;
  if (!("kind" in value)) return false;
  return value.kind === "artifact";
}
