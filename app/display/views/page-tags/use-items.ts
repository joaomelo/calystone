import type { Item, ItemData } from "@/display/views/outline-item";
import type { Tag } from "@/domain";
import type { OutlineGridExpandedKeys } from "@/utils";

import { Store } from "@/display/store";
import { computed, ref } from "vue";

export function useItems() {
  const { services } = Store.use();

  const expandedKeys = ref<OutlineGridExpandedKeys>({});

  const items = computed<Item[]>(() => {
    const tags = services.computeTags.compute();
    const list = tags.list();
    return list.map((tag) => convert({ expanded: expandedKeys.value, tag }));
  });

  return { expandedKeys, items };
}

function convert(options: { expanded: OutlineGridExpandedKeys; tag: Tag }): Item {
  const { expanded, tag } = options;

  const key = tag.name;
  const label = tag.name;
  const visibleChildren = solveChildren({ expanded, tag });
  const leaf = isImpossibleToHaveChildren(tag);
  const data: ItemData = {
    key,
    type: "tag"
  };

  return { children: visibleChildren, data, key, label, leaf };
}

function isImpossibleToHaveChildren(tag: Tag): boolean {
  const todos = tag.prioritize();
  return todos.length === 0;
}

function solveChildren(options: { expanded: OutlineGridExpandedKeys; tag: Tag }): Item[] {
  const { expanded, tag } = options;
  if (!expanded[tag.name]) return [];

  const todos = tag.prioritize();
  return todos.map(todo => {
    const label = `${todo.basename()} ${todo.prioritizer.priority().toString()}`;
    const data: ItemData = {
      key: todo.id,
      type: "node"
    };
    return { children: [], data, key: todo.id, label, leaf: true, };
  });
}