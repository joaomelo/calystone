import type { OutlineNodesItem } from "@/display/views/outline-nodes";
import type { Compare } from "@/utils";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import { TodoArtifact } from "@/domain";
import { comparator } from "@/utils";
import { computed } from "vue";

import type { Filters } from "./filters";

export function useItems(filters: Ref<Filters>) {
  const { services } = Store.use();
  const todos = services.spawnCollections.todos();
  const ascendancy = services.spawnCollections.ascendancy();

  return computed<OutlineNodesItem[]>(() => {
    const {
      criterion,
      tag
    } = filters.value;
    if (!tag) return [];

    const filteredTodos = todos.hasTag(tag);

    const compareByPriority: Compare<TodoArtifact> = criterion
      ? TodoArtifact.createCompareByCriterion(criterion)
      : (a, b) => TodoArtifact.compareByPriority(a, b);
    const compare = comparator(
      compareByPriority,
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
