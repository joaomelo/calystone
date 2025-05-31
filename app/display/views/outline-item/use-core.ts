import { Store } from "@/display/store";
import { BinaryArtifact, Directory, TextArtifact, TodoArtifact } from "@/domain";
import { throwError } from "@/utils";
import { computed } from "vue";
import { h } from "vue";

import type { OutlineItemData } from "./outline-item-data";

import CoreBinary from "./core-binary.vue";
import CoreDirectory from "./core-directory.vue";
import CoreTag from "./core-tag.vue";
import CoreText from "./core-text.vue";
import CoreTodo from "./core-todo.vue";

export function useCore(item: OutlineItemData) {
  const { nodes, services } = Store.use();
  return computed(() => {
    if (item.type === "tag") {
      const tag = services.computeTags.getTagOrThrow(item.key);
      return h(CoreTag, { tag });
    };

    const node = nodes.getOrThrow(item.key);
    if (node instanceof Directory) {
      return h(CoreDirectory, { directory: node });
    };

    if (node instanceof TextArtifact) {
      return h(CoreText, { text: node });
    };

    if (node instanceof TodoArtifact) {
      return h(CoreTodo, { todo: node });
    };

    if (!(node instanceof BinaryArtifact)) throwError("INVALID_NODE_TYPE");

    return h(CoreBinary, { binary: node });
  });
}
