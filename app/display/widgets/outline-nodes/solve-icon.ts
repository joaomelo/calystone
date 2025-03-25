import type { Node } from "@/domain";

import { Directory } from "@/domain";

export function solveIcon(node: Node): string {
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