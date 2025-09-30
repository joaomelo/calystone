import type { OutlineNodesItem } from "@/display/views/outline-nodes";
import type { Compare } from "@/utils";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import { TodoArtifact } from "@/domain";
import { comparator } from "@/utils";
import { computed } from "vue";

export function useItems(tagRef: Ref<string>) {
  const { services } = Store.use();
  const todos = services.spawnCollections.todos();
  const ascendancy = services.spawnCollections.ascendancy();

  return computed<OutlineNodesItem[]>(() => {
    const tag = tagRef.value;
    if (!tag) return [];

    const filteredTodos = todos.hasTag(tag);

    const compare: Compare<TodoArtifact> = comparator(
      (a, b) => TodoArtifact.compareByPriority(a, b),
      (a, b) => ascendancy.compareByPath(a, b)
    );
    filteredTodos.sort(compare);

    return filteredTodos.map((todo) => {
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
}
