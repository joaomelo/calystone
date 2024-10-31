import type { Artifact } from "@/domain";
import type { TreeNode as TreeNodePrime } from "primevue/treenode";

import { Directory } from "@/domain";

export function convert(artifact: Artifact): TreeNodePrime {

  const isDirectory = artifact instanceof Directory;

  const key = artifact.id;
  const label = artifact.name;
  const icon = isDirectory ? "pi pi-folder" : "pi pi-file";

  const children = isDirectory
    ? Array.from(artifact.children).map(convert)
    : [];

  return { children, icon, key, label };
}
