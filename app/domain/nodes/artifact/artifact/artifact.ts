import type { Node } from "@/domain/nodes/node";

import { isNode } from "@/domain/nodes/node";

import type { Mime } from "../mime";

export interface Artifact extends Node {
  kind: "artifact";
  lastModified: number;
  mime: Mime;
  size: number;
}

export function isArtifact(value: unknown): value is Artifact {
  if (!isNode(value)) return false;
  if (!("kind" in value)) return false;
  return value.kind === "artifact";
}
