<script setup lang="ts">
import type {
  OutlineGridItem,
  OutlineGridKeys,
  OutlineGridMode,
} from "@/utils";

import { Node } from "@/domain";
import {
  OutlineGrid,
  ScrollPanel
} from "@/utils";

import type { OutlineNodesItem } from "./outline-nodes-item";

defineProps<{
  dataTest: string;
  displayMode?: OutlineGridMode;
  items: OutlineNodesItem[];
}>();
const emit = defineEmits<{
  collapsed: [node: Node];
  expanded: [node: Node];
  selected: [node: Node];
  unselected: [node: Node];
}>();

const expandedKeys = defineModel<OutlineGridKeys>("expandedKeys", { default: () => ({}) });
const selectedKeys = defineModel<OutlineGridKeys>("selectedKeys", { default: () => ({}) });

function handleCollapsed(item: OutlineGridItem) {
  if (!(item.data instanceof Node)) return;
  emit("collapsed", item.data);
}

function handleExpanded(item: OutlineGridItem) {
  if (!(item.data instanceof Node)) return;
  emit("expanded", item.data);
}

function handleSelected(item: OutlineGridItem) {
  if (!(item.data instanceof Node)) return;
  emit("selected", item.data);
}

function handleUnselected(item: OutlineGridItem) {
  if (!(item.data instanceof Node)) return;
  emit("unselected", item.data);
}
</script>
<template>
  <ScrollPanel>
    <OutlineGrid
      v-model:expanded-keys="expandedKeys"
      v-model:selected-keys="selectedKeys"
      :data-test="dataTest"
      :display-mode="displayMode"
      :items="items"
      @collapsed="handleCollapsed"
      @expanded="handleExpanded"
      @selected="handleSelected"
      @unselected="handleUnselected"
    >
      <template #default="slotProps">
        <slot
          :node="slotProps.node.data"
        />
      </template>
    </OutlineGrid>
  </ScrollPanel>
</template>
