<script setup lang="ts">
import PrimeVueTree from "primevue/tree";

import type {
  OutlineGridExpandedKeys,
  OutlineGridItem,
  OutlineGridMode,
  OutlineGridSelectionKeys
} from "./types";

const {
  dataTest, items, mode = "list"
} = defineProps<{
  dataTest: string;
  items: OutlineGridItem[];
  mode?: OutlineGridMode;
}>();
const emit = defineEmits<{
  expanded: [key: OutlineGridItem];
  selected: [key: OutlineGridItem | undefined];
}>();

const expandedKeys = defineModel<OutlineGridExpandedKeys>("expandedKeys", { default: () => ({}) });
const selectedKeys = defineModel<OutlineGridSelectionKeys>("selectedKeys", { default: () => ({}) });

function handleItemExpand(item: OutlineGridItem) {
  emit("expanded", item);
}

function handleNodeSelect(item: OutlineGridItem) {
  emit("selected", item);
}

function handleNodeUnselect() {
  emit("selected", undefined);
}
</script>
<template>
  <PrimeVueTree
    v-model:expanded-keys="expandedKeys"
    v-model:selection-keys="selectedKeys"
    selection-mode="single"
    :data-test="dataTest"
    :value="items"
    class="outline-grid"
    :class="{ tree: mode === 'tree', list: mode === 'list' }"
    @node-expand="handleItemExpand"
    @node-select="handleNodeSelect"
    @node-unselect="handleNodeUnselect"
  >
    <template #default="slotProps">
      <slot
        name="default"
        v-bind="slotProps"
      />
    </template>
  </PrimeVueTree>
</template>
<style scoped>
.outline-grid.list {

  & :deep(.p-tree-node-toggle-button),
  & :deep(.p-tree-node-icon) {
    display: none;
  }
}
</style>