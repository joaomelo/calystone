import type { Artifact } from "@/domain/artifact";

import type { Directory } from "./directory";

export function affiliate(parent: Directory, child: Artifact) {
  child.parent = parent;
  parent.children.push(child);
}
