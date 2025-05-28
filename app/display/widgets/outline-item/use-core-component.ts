import { Store } from "@/display/store";
import { Directory, TextArtifact, TodoArtifact } from "@/domain";
import { computed } from "vue";

import type { OutlineItemData } from "./outline-item-data";

import CoreBinary from "./core-binary.vue";
import CoreDirectory from "./core-directory.vue";
import CoreTag from "./core-tag.vue";
import CoreText from "./core-text.vue";
import CoreTodo from "./core-todo.vue";

export function useCoreComponent(item: OutlineItemData) {
  const { nodes } = Store.use();
  return computed(() => {
    if (item.type === "tag") return CoreTag;

    const node = nodes.getOrThrow(item.key);
    if (node instanceof Directory) return CoreDirectory;
    if (node instanceof TextArtifact) return CoreText;
    if (node instanceof TodoArtifact) return CoreTodo;
    return CoreBinary;
  });
}
