import type {
  Item,
  ItemData
} from "@/display/views/outline-item";

import { Store } from "@/display/store";
import { TodoArtifact } from "@/domain";
import { computed } from "vue";

import type { Filters } from "./filters";

export function useItems(filters: Filters) {
  const { services } = Store.use();

  const items = computed<Item[]>(() => {
    if (!filters.criterion) return [];

    const {
      criterion,
      tag
    } = filters;

    const todos: TodoArtifact[] = [];
    const nodes = services.retrieveNodes.list();
    for (const node of nodes) {
      if (!(node instanceof TodoArtifact)) continue;
      if (!node.hasCriterion(criterion)) continue;
      if (tag && !node.tagger.has(tag)) continue;
      todos.push(node);
    }

    todos.sort((a, b) => {
      const aCriterion = a.criterion(criterion);
      const aCriterionValue = aCriterion.value;
      const bCriterion = b.criterion(criterion);
      const bCriterionValue = bCriterion.value;
      return bCriterionValue - aCriterionValue;
    });

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
