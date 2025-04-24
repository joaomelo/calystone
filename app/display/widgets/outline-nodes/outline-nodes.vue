<script setup lang="ts">
import type { Id, Nodes } from "@/domain";
import type { TreeNode } from "primevue/treenode";

import { OutlineNode } from "@/display/widgets/outline-node";
import { isId } from "@/domain";
import { isObjectLike, ScrollPanel } from "@/utils";
import PrimeVueTree from "primevue/tree";
import { computed, ref } from "vue";

import { convert } from "./convert";

const { nodes } = defineProps<{
  nodes: Nodes // is important to use the reactive data structure with all nodes to trigger the reactivity system. passing a array with only the root objects will not secure ui updates for deeper nodes.
}>();
const emit = defineEmits<{
  expanded: [id: Id];
  selected: [id: Id | undefined];
}>();

const tree = computed(() => nodes.list().filter(n => n.isRoot()).map(convert));

// this is nedeed so the prime vue component can visualy show the selected node
const selectedKey = ref();

function handleNodeExpand(node: TreeNode) {
  const id = resolveKey(node);
  if (id) emit("expanded", id);
}

function handleNodeSelect(node: TreeNode) {
  emit("selected", resolveKey(node));
}

function handleNodeUnselect() {
  emit("selected", undefined);
}

function resolveKey(node?: TreeNode) {
  if (!isObjectLike(node)) {
    return undefined;
  }
  if (!isId(node.key)) {
    return undefined;
  }
  return node.key;
};
</script>
<template>
  <ScrollPanel>
    <PrimeVueTree
      v-model:selection-keys="selectedKey"
      selection-mode="single"
      data-test="nodes-outline-tree"
      :value="tree"
      @node-expand="handleNodeExpand"
      @node-select="handleNodeSelect"
      @node-unselect="handleNodeUnselect"
    >
      <template #default="slotProps">
        <OutlineNode :node="slotProps.node.data" />
      </template>
    </PrimeVueTree>
  </ScrollPanel>
</template>
