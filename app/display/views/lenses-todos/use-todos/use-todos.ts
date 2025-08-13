import type {
  Item,
  ItemData
} from "@/display/views/outline-item";

import { Store } from "@/display/store";
import { TodoArtifact } from "@/domain";
import { computed } from "vue";

import type { Lenses } from "../lenses";

import { createCompare } from "./compare";

export function useTodos(lenses: Lenses) {
  const { services } = Store.use();

  const items = computed<Item[]>(() => {
    const {
      criterion,
      tag
    } = lenses;

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
