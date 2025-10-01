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
    class="outline-grid"
    :class="{ tree: displayMode === 'tree', list: displayMode === 'list' }"
    :data-test="dataTest"
    :selection-mode="selectionMode"
    :value="items"
    @node-collapse="$emit('collapsed', $event)"
    @node-expand="$emit('expanded', $event)"
    @node-select="$emit('selected', $event)"
    @node-unselect="$emit('unselected', $event)"
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