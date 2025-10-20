<script setup lang="ts">
import type { TreeNodeDropEvent } from "primevue/tree";

import PrimeVueTree from "primevue/tree";

import type {
  OutlineGridItem,
  OutlineGridKeys,
  OutlineGridMode,
} from "./types";

const {
  dataTest,
  displayMode = "list",
  draggable = false,
  items,
  selectionMode = "single",
} = defineProps<{
  dataTest: string;
  displayMode?: OutlineGridMode;
  draggable?: boolean;
  items: OutlineGridItem[];
  selectionMode?: "multiple" | "single";
}>();
const emit = defineEmits<{
  collapsed: [key: OutlineGridItem];
  drop: [event: {
    dragNode: OutlineGridItem;
    dropNode: OutlineGridItem
  }];
  expanded: [key: OutlineGridItem];
  selected: [key: OutlineGridItem];
  unselected: [key: OutlineGridItem];
}>();

const expandedKeys = defineModel<OutlineGridKeys>("expandedKeys", { default: () => ({}) });
const selectedKeys = defineModel<OutlineGridKeys>("selectedKeys", { default: () => ({}) });

const mustBeDefinedToEnableDnD = draggable ? () => undefined : undefined;

function handleDrop({
  dragNode,
  dropNode,
}: TreeNodeDropEvent) {
  emit("drop", {
    dragNode,
    dropNode
  });
}

</script>
<template>
  <PrimeVueTree
    v-model:expanded-keys="expandedKeys"
    v-model:selection-keys="selectedKeys"
    class="outline-grid"
    :class="{ tree: displayMode === 'tree', list: displayMode === 'list' }"
    :data-test="dataTest"
    :draggable-nodes="draggable"
    :droppable-nodes="draggable"
    :selection-mode="selectionMode"
    :value="items"
    @node-collapse="$emit('collapsed', $event)"
    @node-drop="handleDrop"
    @node-expand="$emit('expanded', $event)"
    @node-select="$emit('selected', $event)"
    @node-unselect="$emit('unselected', $event)"
    @update:value="mustBeDefinedToEnableDnD"
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