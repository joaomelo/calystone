<script setup lang="ts">
import PrimeVueTree from "primevue/tree";

import type { TreeGridExpandedKeys, TreeGridItem, TreeGridSelectionKeys } from "./types";

const { dataTest, items } = defineProps<{
  dataTest: string;
  items: TreeGridItem[];
}>();
const emit = defineEmits<{
  expanded: [key: TreeGridItem];
  selected: [key: TreeGridItem | undefined];
}>();

const expandedKeys = defineModel<TreeGridExpandedKeys>("expandedKeys", { required: true });
const selectedKeys = defineModel<TreeGridSelectionKeys | undefined>("selectedKeys", { required: true });

function handleItemExpand(item: TreeGridItem) {
  emit("expanded", item);
}

function handleNodeSelect(item: TreeGridItem) {
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
