import type {
  Item,
  ItemData
} from "@/display/views/outline-item";

import { Store } from "@/display/store";
import { computed } from "vue";

import type { Filters } from "./filters";

export function useItems(filters: Filters) {
  const { services } = Store.use();

  const items = computed<Item[]>(() => {
    if (!filters.criterion) return [];

    const todos = services.computeCriteria.todosCriterioneddBy(filters.criterion);
    return todos.map((todo) => {
      const key = todo.id;
      const label = todo.basename();
      const data: ItemData = {
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
