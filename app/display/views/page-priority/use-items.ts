import type { OutlineNodesItem } from "@/display/views/outline-nodes";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import { createCompare } from "@/display/views/compare";
import { TodoArtifact } from "@/domain";
import { computed } from "vue";

import type { Filters } from "./filters";

export function useItems(filters: Ref<Filters>) {
  const { services } = Store.use();

  const items = computed<OutlineNodesItem[]>(() => {
    const {
      criterion,
      tag
    } = filters.value;
    if (!criterion) return [];

    const todos: TodoArtifact[] = [];

    const nodes = services.retrieveNodes.list();
    for (const node of nodes) {
      if (node.isUnloaded()) continue;
      if (!(node instanceof TodoArtifact)) continue;
      if (tag && !node.tagger.has(tag)) continue;
      todos.push(node);
    }

    const compare = createCompare({
      criterion,
      services
    });
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
