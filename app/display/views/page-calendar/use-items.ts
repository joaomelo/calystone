import type {
  OutlineNodesItem,
  OutlineNodesItemMetadata
} from "@/display/views/outlines-node/outline-node";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import { throwCritical } from "@/utils";
import { computed } from "vue";

export function useItems(date: Ref<Date>) {
  const { services } = Store.use();

  const items = computed<OutlineNodesItem[]>(() => {
    const start = new Date(date.value);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date.value);
    end.setHours(23, 59, 59, 999);

    const todos = services.trackTodos.todosWithin({
      end,
      start
    });
    todos.sort((a, b) => {
      const aStart = a.dateStart();
      const bStart = b.dateStart();
      if (!aStart || !bStart) throwCritical("TODO_MUST_HAVE_DATES");
      return aStart.getTime() - bStart.getTime();
    });

    return todos.map(todo => {
      const key = todo.id;
      const label = todo.basename();
      const data: OutlineNodesItemMetadata = {
        key,
        type: "node"
      };
      return {
        children: [],
        data,
        key,
        label,
        leaf: true
      };
    });
  });

  return items;
}