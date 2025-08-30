<script setup lang="ts">
import type {
  Item,
  ItemData
} from "@/display/views/outline-item";
import type {
  OutlineGridItem,
  OutlineGridKeys,
  OutlineGridMode,
} from "@/utils";

import { isItemData } from "@/display/views/outline-item";
import {
  OutlineGrid,
  ScrollPanel
} from "@/utils";

defineProps<{
  dataTest: string;
  displayMode?: OutlineGridMode;
  items: Item[];
}>();
const emit = defineEmits<{
  collapsed: [key: ItemData];
  expanded: [key: ItemData];
  selected: [key: ItemData];
  unselected: [key: ItemData];
}>();

const expandedKeys = defineModel<OutlineGridKeys>("expandedKeys", { default: () => ({}) });
const selectedKeys = defineModel<OutlineGridKeys>("selectedKeys", { default: () => ({}) });

function handleCollapsed(item: OutlineGridItem) {
  if (!isItemData(item.data)) return;
  emit("collapsed", item.data);
}

function handleExpanded(item: OutlineGridItem) {
  if (!isItemData(item.data)) return;
  emit("expanded", item.data);
}

function handleSelected(item: OutlineGridItem) {
  if (!isItemData(item.data)) return;
  emit("selected", item.data);
}

function handleUnselected(item: OutlineGridItem) {
  if (!isItemData(item.data)) return;
  emit("unselected", item.data);
}
</script>
<template>
  <ScrollPanel>
    <OutlineGrid
      v-model:expanded-keys="expandedKeys"
      v-model:selected-keys="selectedKeys"
      :data-test="dataTest"
      :items="items"
      :display-mode="displayMode"
      @expanded="handleExpanded"
      @selected="handleSelected"
      @unselected="handleUnselected"
      @collapsed="handleCollapsed"
    >
      <template #default="slotProps">
        <slot :item-data="slotProps.node.data" />
      </template>
    </OutlineGrid>
  </ScrollPanel>
</template>
