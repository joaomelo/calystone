<script setup lang="ts">
import type { Id } from "@/domain";
import type { TreeNode } from "primevue/treenode";

import { Store } from "@/display/store";
import { ScrollPanel } from "@/utils";
import PrimeVueTree from "primevue/tree";
import { computed, ref } from "vue";

type Selected = { id: Id; type: "node" } | { label: string; type: "tag" } | { type: "none" };

const emit = defineEmits<{
  selected: [data: Selected];
}>();

const { tags } = Store.use();

const tree = computed<TreeNode[]>(() => {
  return tags.list().map(tag => {
    const treeNode: TreeNode = {
      children: [],
      data: undefined,
      key: tag,
      label: tag,
      leaf: true
    };
    return treeNode;
  });
});

// this is nedeed so the prime vue component can visualy show the selected node
const selectedKey = ref();

function handleNodeSelect(treeNode: TreeNode) {
  emit("selected", { label: treeNode.key, type: "tag" });
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
