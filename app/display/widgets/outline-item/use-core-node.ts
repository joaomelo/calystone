import { Store } from "@/display/store";
import { computed } from "vue";

import type { OutlineItemData } from "./outline-item-data";

export function useCoreNode(item: OutlineItemData) {

  const { nodes } = Store.use();
  const node = nodes.getOrThrow(item.key);

  const label = computed(() => node.name);

  const baseIcon = computed(() => {
    const iconPrefix = "bx bx-sm";
    const loadingEffect = node.isBusy() ? "bx-flashing" : "";
    return `${iconPrefix} ${loadingEffect}`;
  });

  return {
    baseIcon,
    label,
    node,
  };
}
