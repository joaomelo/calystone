import type { Artifact } from "@/domain";
import type { TreeNode } from "primevue/treenode";

import { isDirectory } from "@/domain";

export function convert(artifact: Artifact): TreeNode {
  const key = artifact.id;
  const label = artifact.name;
  const icon = isDirectory(artifact) ? "pi pi-folder" : "pi pi-file";
  const children = isDirectory(artifact) ? artifact.children.map(convert) : [];
  return { children, icon, key, label };
}
