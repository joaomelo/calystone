import type { OutlineNodesItem } from "@/display/views/outline-nodes";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import { createCompare } from "@/display/views/compare";
import { TodoArtifact } from "@/domain";
import { computed } from "vue";

export function useItems(tagRef: Ref<string>) {
  const { services } = Store.use();

  const items = computed<OutlineNodesItem[]>(() => {
    const tag = tagRef.value;
    if (!tag) return [];

    const todos: TodoArtifact[] = [];

    const nodes = services.spawnCollections.list();
    for (const node of nodes) {
      if (node.isUnloaded()) continue;
      if (!(node instanceof TodoArtifact)) continue;
      if (!node.tagger.has(tag)) continue;
      todos.push(node);
    }

    const compare = createCompare({ services });
    todos.sort(compare);

    return todos.map((todo) => {
      const key = todo.id;
      const label = todo.basename();
      return {
        children: [],
        data: todo,
        key,
        label,
        leaf: true
      };
    });
  });

  return items;
}
