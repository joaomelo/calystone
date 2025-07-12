import { Store } from "@/display/store";
import { BinaryArtifact, Directory, TextArtifact, TodoArtifact } from "@/domain";
import { throwError } from "@/utils";
import { computed, h } from "vue";

import type { ItemData } from "./item";

import CoreBinary from "./core-binary.vue";
import CoreDirectory from "./core-directory.vue";
import CoreTag from "./core-tag.vue";
import CoreText from "./core-text.vue";
import CoreTodo from "./core-todo.vue";

export function useCore(data: ItemData) {
  const { services } = Store.use();
  return computed(() => {
    if (data.type === "tag") {
      const tag = services.computeTags.getTagOrThrow(data.key);
      return h(CoreTag, { tag });
    };

    const node = services.retrieveNodes.getOrThrow(data.key);
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
