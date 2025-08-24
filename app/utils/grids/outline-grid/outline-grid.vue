<script setup lang="ts">
import PrimeVueTree from "primevue/tree";

import type {
  OutlineGridItem,
  OutlineGridKeys,
  OutlineGridMode,
} from "./types";

const {
  dataTest,
  displayMode = "list",
  items,
  selectionMode = "single"
} = defineProps<{
  dataTest: string;
  displayMode?: OutlineGridMode;
  items: OutlineGridItem[];
  selectionMode?: "multiple" | "single";
}>();
defineEmits<{
  collapsed: [key: OutlineGridItem];
  expanded: [key: OutlineGridItem];
  selected: [key: OutlineGridItem];
  unselected: [key: OutlineGridItem];
}>();

const expandedKeys = defineModel<OutlineGridKeys>("expandedKeys", { default: () => ({}) });
const selectedKeys = defineModel<OutlineGridKeys>("selectedKeys", { default: () => ({}) });
</script>
<template>
  <PrimeVueTree
    v-model:expanded-keys="expandedKeys"
    v-model:selection-keys="selectedKeys"
    :selection-mode="selectionMode"
    :data-test="dataTest"
    :value="items"
    class="outline-grid"
    :class="{ tree: displayMode === 'tree', list: displayMode === 'list' }"
    @node-expand="$emit('expanded', $event)"
    @node-select="$emit('selected', $event)"
    @node-unselect="$emit('unselected', $event)"
    @node-collapse="$emit('collapsed', $event)"
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