<script setup lang="ts">
import { isObjectLike } from "@/utils/objects";
import PrimeVueTree from "primevue/tree";

import type { TreeGridExpandedKeys, TreeGridItem, TreeGridSelectionKeys } from "./types";

const { dataTest, items } = defineProps<{
  dataTest: string;
  items: TreeGridItem[];
}>();
const emit = defineEmits<{
  expanded: [key: string];
  selected: [key: string | undefined];
}>();

const expandedKeys = defineModel<TreeGridExpandedKeys>("expandedKeys", { required: true });
const selectedKeys = defineModel<TreeGridSelectionKeys | undefined>("selectedKeys", { required: true });

function handleItemExpand(item: TreeGridItem) {
  const id = resolveKey(item);
  if (id) emit("expanded", id);
}

function handleNodeSelect(item: TreeGridItem) {
  emit("selected", resolveKey(item));
}

function handleNodeUnselect() {
  emit("selected", undefined);
}

function resolveKey(item?: TreeGridItem) {
  if (!isObjectLike(item)) {
    return undefined;
  }
  if (typeof item.key !== "string") {
    return undefined;
  }
  return item.key;
};
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
