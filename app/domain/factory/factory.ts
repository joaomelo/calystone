import type { Node } from "@/domain/node";

import { Artifact } from "@/domain/artifact";
import { Directory } from "@/domain/directory";

import type { NodeOptionsAndKind } from "./kind";

export function createNode(options: NodeOptionsAndKind): Node {
  return options.kind === "artifact" ? new Artifact(options) : new Directory(options);
}