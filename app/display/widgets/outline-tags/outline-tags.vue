<script setup lang="ts">
import type { OutlineItemData } from "@/display/widgets/outline-item";
import type { Tag } from "@/domain/tags/tag";
import type { TreeNode } from "primevue/treenode";

import { Store } from "@/display/store";
import { isOutlineItemData, OutlineItem } from "@/display/widgets/outline-item";
import { ScrollPanel } from "@/utils";
import PrimeVueTree from "primevue/tree";
import { computed, ref } from "vue";

const emit = defineEmits<{
  selected: [data?: OutlineItemData];
}>();

const { services } = Store.use();

const tree = computed<TreeNode[]>(() => {
  const tags = services.computeTags.compute();
  const list = tags.list();

  return list.map(tag => {
    const children = solveChildrenOf(tag);
    const data: OutlineItemData = {
      key: tag.name,
      type: "tag"
    };
    const treeNode: TreeNode = {
      children,
      data: data as unknown,
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

  return todos.map(todo => {
    const data: OutlineItemData = {
      key: todo.id,
      type: "node"
    };

    return {
      children: [],
      data: data as unknown,
      key: todo.id,
      label: `${todo.basename()} ${todo.prioritizer.priority().toString()}`,
      leaf: true,
    };
  });
}

// this is nedeed so the prime vue component can visualy show the selected node
const selectedKey = ref();

function handleNodeSelect(treeNode: TreeNode) {
  const data = treeNode.data as unknown;
  if (!isOutlineItemData(data)) return;
  emit("selected", data);
}

function handleNodeUnselect() {
  emit("selected", undefined);
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
    >
      <template #default="slotProps">
        <OutlineItem :item="slotProps.node.data" />
      </template>
    </PrimeVueTree>
  </ScrollPanel>
</template>
