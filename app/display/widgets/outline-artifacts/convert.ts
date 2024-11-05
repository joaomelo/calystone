import type { Artifact, Artifacts } from "@/domain";
import type { TreeNode } from "primevue/treenode";

import { createIsChildren, isDirectory, list } from "@/domain";

export function convert(artifacts: Artifacts, artifact: Artifact): TreeNode {
  const key = artifact.id;
  const label = artifact.name;

  if (!isDirectory(artifact)) return { children: [], icon: "pi pi-file", key, label };

  const children = list(artifacts)
    .filter(createIsChildren(artifact.id))
    .map((child: Artifact) => convert(artifacts, child));

  return { children, icon: "pi pi-folder", key, label };
}
