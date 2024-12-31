<script setup lang="ts">
import type { Id, Node } from "@/domain";
import type { TreeNode } from "primevue/treenode";

import { isId } from "@/domain";
import { isObjectLike } from "@/utils";
import PrimeVueTree from "primevue/tree";
import { computed, ref } from "vue";

import { ScrollPanel } from "../scroll-panel";
import { convert } from "./convert";

// the interface makes easier to deal with the vue typescript idiossincrasies. withou it, components that use this one tend to complain about not finding some properties and methods.
interface NodesLister {
  list(): Node[]
}

const { nodes } = defineProps<{
  nodes?: NodesLister; // is important to use the reactive top-most data structure here to trigger the reactivity, passing a array of root objects will not secure ui updates.
}>();
const emit = defineEmits<{
  expanded: [id: Id];
  selected: [id: Id | undefined];
}>();

const value = nodes
  ? computed(() => nodes.list().filter(n => n.root()).map(convert))
  : ref([]);

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
  <div class="outline-nodes">
    <ScrollPanel class="outline-nodes-scroll">
      <PrimeVueTree
        v-model:selectionKeys="selectedKey"
        selection-mode="single"
        :value
        @node-expand="handleNodeExpand"
        @node-select="handleNodeSelect"
        @node-unselect="handleNodeUnselect"
      />
    </ScrollPanel>
  </div>
</template>
<style scoped>
.outline-nodes,
.outline-nodes-scroll {
  /* this will contain the component between the height boundaries of its parent  */
  height: 100%;
}

.outline-nodes :deep(.p-progressbar) {
  border-radius: 0;
  height: var(--border-size-2);
}
</style>