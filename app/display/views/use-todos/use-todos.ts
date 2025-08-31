import type {
  OutlineNodesItem,
  OutlineNodesItemMetadata
} from "@/display/views/outlines-node/outline-node";
import type { Ref } from "vue";

import { Store } from "@/display/store";
import { TodoArtifact } from "@/domain";
import { computed } from "vue";

import type { TodosFilters } from "./filters";

import { createCompare } from "./compare";

export function useTodos(filters: Ref<TodosFilters>) {
  const { services } = Store.use();

  const items = computed<OutlineNodesItem[]>(() => {
    const {
      criterion,
      tag
    } = filters.value;

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
