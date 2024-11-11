import type { SourceResources } from "@/domain/connection";

import { isNode } from "@/domain/node";

import type { Artifact } from "./artifact";

export function isArtifact<Resources extends SourceResources>(value: unknown): value is Artifact<Resources> {
  if (!isNode(value)) return false;
  if (!("kind" in value)) return false;
  return value.kind === "artifact";
}
