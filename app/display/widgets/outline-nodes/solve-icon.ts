import type { Node } from "@/domain";

import { Directory } from "@/domain";

export function solveIcon(node: Node): string {
  const baseIcon = "bx bx-sm";
  const iconBusy = "bx-flashing";
  const baseDirectory = "folder";
  const baseArtifact = "file-blank";
  const iconMap = {
    artifact: {
      busy: `${baseIcon} bx-${baseArtifact} ${iconBusy}`,
      loaded: `${baseIcon} bxs-${baseArtifact}`,
      unloaded: `${baseIcon} bx-${baseArtifact}`,
    },
    directory: {
      busy: `${baseIcon} bx-${baseDirectory} ${iconBusy}`,
      loaded: `${baseIcon} bxs-${baseDirectory}`,
      unloaded: `${baseIcon} bx-${baseDirectory}`,
    }
  };
  const iconFamily = node instanceof Directory ? "directory" : "artifact";
  const iconStatus = node.isBusy() ? "busy" : node.isLoaded() ? "loaded" : "unloaded";
  return iconMap[iconFamily][iconStatus];
}