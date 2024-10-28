import type { Artifact } from "@/domain";
import type { TreeNode } from "@/utils";
import type { TreeNode as TreeNodePrime } from "primevue/treenode";

export function mapNode(node: TreeNode<Artifact>): TreeNodePrime {
  const item = mapArtifact(node.item);
  const children = node.children.map(mapNode);
  return { ...item, children };
}

function mapArtifact(artifact: Artifact) {
  return {
    icon: artifact.type === "file" ? "pi pi-file" : "pi pi-folder",
    key: artifact.id,
    label: artifact.name,
  };
}