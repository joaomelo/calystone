import { Store } from "@/display/store";
import { Directory, TextArtifact, TodoArtifact } from "@/domain";
import { computed } from "vue";

import type { OutlineItemData } from "./outline-item-data";

export function useAppearance(item: OutlineItemData) {
  const { nodes } = Store.use();

  const baseIcon = "bx bx-sm";

  return computed(() => {
    if (item.type === "tag") {
      return {
        icon: `${baseIcon} bx-purchase-tag-alt`,
        label: item.key,
        style: {}
      };
    }

    const node = nodes.getOrThrow(item.key);
    const baseNodeIcon = `${baseIcon} ${node.isBusy() ? "bx-flashing" : ""}`;

    if (node instanceof Directory) {
      return {
        icon: `${baseNodeIcon} ${ node.isLoaded() ? "bxs-folder" : "bx-folder"}`,
        label: node.name,
        style: {}
      };
    }

    if (node instanceof TextArtifact) {
      return {
        icon: `${baseNodeIcon} ${node.isLoaded() ? "bxs-file-txt" : "bx-file-blank"}`,
        label: node.name,
        style: {}
      };
    }

    if (node instanceof TodoArtifact) {
      const todoIcon = !node.isLoaded()
        ? "bx-task"
        : node.progressor.completed()
          ? "bx-checkbox-checked"
          : "bx-checkbox";
      const style = node.progressor.completed() ? { textDecoration: "line-through" } : {};
      return {
        icon: `${baseNodeIcon} ${todoIcon}`,
        label: node.name,
        style
      };
    }

    return {
      icon: `${baseNodeIcon} ${node.isLoaded() ? "bxs-file" : "bx-file"}`,
      label: node.name,
      style: {}
    };
  });
}
