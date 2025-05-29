<script setup lang="ts">
import type { Id, Nodes } from "@/domain";
import type { TreeExpandedKeys } from "primevue/tree";
import type { TreeNode } from "primevue/treenode";

import { OutlineItem } from "@/display/widgets/outline-item";
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

const selectedKey = ref(); // this is nedeed so the prime vue component can visualy show the selected node
const expandedKeys = ref<TreeExpandedKeys>({});
const tree = computed(() =>
  nodes.list()
    .filter(n => n.isRoot())
    .map((root) => convert({ expanded: expandedKeys.value, node: root }))
);

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
      v-model:expanded-keys="expandedKeys"
      v-model:selection-keys="selectedKey"
      class="outline-nodes__tree"
      selection-mode="single"
      data-test="nodes-outline-tree"
      :value="tree"
      @node-expand="handleNodeExpand"
      @node-select="handleNodeSelect"
      @node-unselect="handleNodeUnselect"
    >
      <template #default="slotProps">
        <OutlineItem :item="slotProps.node.data" />
      </template>
    </PrimeVueTree>
  </ScrollPanel>
</template>
<style scoped>
.outline-nodes__tree :deep(.p-tree-node-label) {
  flex: 1;
}
</style>
