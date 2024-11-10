import { isNode } from "@/domain/node";

import type { Artifact } from "./artifact";

export function isArtifact(value: unknown): value is Artifact<unknown> {
  if (!isNode(value)) return false;
  if (!("kind" in value)) return false;
  return value.kind === "artifact";
}
