import type { OutlineNodesItem } from "@/display/views/outline-nodes";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import { TodoArtifact } from "@/domain";
import { comparator } from "@/utils";
import { computed } from "vue";

export function useItems(date: Ref<Date>) {
  const { services } = Store.use();
  const todos = services.spawnCollections.todos();
  const ascendancy = services.spawnCollections.ascendancy();

  return computed<OutlineNodesItem[]>(() => {
    const start = new Date(date.value);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date.value);
    end.setHours(23, 59, 59, 999);

    const todosWithin = todos.spansOn({
      end,
      start
    });

    const compare = comparator<TodoArtifact>(
      (a, b) => TodoArtifact.compareBySchedules(a, b),
      (a, b) => ascendancy.compareByPath(a, b)
    );
    todosWithin.sort(compare);

    return todosWithin.map(todo => {
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