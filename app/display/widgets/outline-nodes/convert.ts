import type { Node } from "@/domain";
import type { TreeNode } from "primevue/treenode";

import { Artifact, Directory } from "@/domain";

export function convert(node: Node): TreeNode {
  const key = node.id;
  const label = node.name;
  const children = solveChildren(node).map(convert);
  const leaf = node instanceof Artifact || (node.status === "loaded" && children.length === 0);
  const icon = solveIcon(node);

  return { children, icon, key, label, leaf };
}

function solveChildren(node: Node): Node[] {
  if (!(node instanceof Directory)) return [];
  if (node.children().length === 0) return [];

  const children = node.children();
  children.sort((a: Node, b: Node) => {
    if (a instanceof Directory && b instanceof Artifact) return -1;
    if (a instanceof Artifact && b instanceof Directory) return 1;
    return a.name.localeCompare(b.name);
  });
  return children;
}

function solveIcon(node: Node): string {
  const baseIcon = "bx bx-sm";
  const iconLoading = "bx-flashing";
  const baseDirectory = "folder";
  const baseArtifact = "file-blank";
  const iconMap = {
    artifact: {
      loaded: `${baseIcon} bxs-${baseArtifact}`,
      loading: `${baseIcon} bx-${baseArtifact} ${iconLoading}`,
      unloaded: `${baseIcon} bx-${baseArtifact}`,
    },
    directory: {
      loaded: `${baseIcon} bxs-${baseDirectory}`,
      loading: `${baseIcon} bx-${baseDirectory} ${iconLoading}`,
      unloaded: `${baseIcon} bx-${baseDirectory}`,
    }
  };
  const iconFamily = node instanceof Directory ? "directory" : "artifact";
  const iconStatus = node.status;
  return iconMap[iconFamily][iconStatus];
}