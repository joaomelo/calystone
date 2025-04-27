<script setup lang="ts">
import type { Id } from "@/domain";
import type { Tag } from "@/domain/tags/tag";
import type { TreeNode } from "primevue/treenode";

import { Store } from "@/display/store";
import { isObjectLike, ScrollPanel } from "@/utils";
import PrimeVueTree from "primevue/tree";
import { computed, ref } from "vue";

type Selected = { key: Id; type: "todo" } | { key: string; type: "tag" } | { type: "none" };

const emit = defineEmits<{
  selected: [data: Selected];
}>();

const { tags } = Store.use();

const tree = computed<TreeNode[]>(() => {
  const unsortedTags = tags.list();
  const sortedTags = unsortedTags.sort((a, b) => a.name.localeCompare(b.name));

  return sortedTags.map(tag => {
    const children = solveChildrenOf(tag);
    const treeNode: TreeNode = {
      children,
      data: { name: tag.name, type: "tag" },
      key: tag.name,
      label: tag.name,
      leaf: children.length === 0
    };
    return treeNode;
  });
});

function solveChildrenOf(tag: Tag): TreeNode[] {
  const todos = tag.list();
  todos.sort((a, b) => {
    const result = a.prioritizer.compareTo(b.prioritizer);
    if (result === 0) {
      return a.basename().localeCompare(b.basename());
    }
    return result;
  });

  return Array.from(tag.todos).map(todo => {
    return {
      children: [],
      data: { todo, type: "todo" },
      key: todo.id,
      label: `${todo.basename()} ${todo.prioritizer.priority().toString()}`,
      leaf: true,
    };
  });
}

// this is nedeed so the prime vue component can visualy show the selected node
const selectedKey = ref();

function handleNodeSelect(treeNode: TreeNode) {
  if (!isObjectLike(treeNode.data)) return;
  if (!("type" in treeNode.data) || typeof treeNode.data.type !== "string") return;
  if (treeNode.data.type !== "tag" && treeNode.data.type !== "todo") return;
  emit("selected", { key: treeNode.key, type: treeNode.data.type });
}

function handleNodeUnselect() {
  emit("selected", { type: "none" });
}
</script>
<template>
  <ScrollPanel>
    <PrimeVueTree
      v-model:selection-keys="selectedKey"
      selection-mode="single"
      data-test="tags-outline-tree"
      :value="tree"
      @node-select="handleNodeSelect"
      @node-unselect="handleNodeUnselect"
    />
  </ScrollPanel>
</template>
