<script setup lang="ts">
import type { Item, ItemData } from "@/display/views/outline-item";
import type {
  OutlineGridExpandedKeys,
  OutlineGridItem,
  OutlineGridMode,
  OutlineGridSelectionKeys
} from "@/utils";

import { isItemData } from "@/display/views/outline-item";
import { OutlineItem } from "@/display/views/outline-item";
import { OutlineGrid, ScrollPanel } from "@/utils";
import { ref } from "vue";

defineProps<{
  items: Item[];
  mode?: OutlineGridMode;
}>();
const emit = defineEmits<{
  expanded: [itemData: ItemData];
  selected: [itemData: ItemData | undefined];
}>();
const expandedKeys = defineModel<OutlineGridExpandedKeys>("expandedKeys", { default: [] });

const selectedKeys = ref<OutlineGridSelectionKeys | undefined>();

function handleNodeExpand(item: OutlineGridItem) {
  if (!isItemData(item.data)) return;
  emit("expanded", item.data);
}

function handleNodeSelect(item?: OutlineGridItem) {
  if (!item) {
    emit("selected", undefined);
    return;
  }

  if (!isItemData(item.data)) return;
  emit("selected", item.data);
}
</script>
<template>
  <ScrollPanel class="outline-items">
    <OutlineGrid
      v-model:expanded-keys="expandedKeys"
      v-model:selected-keys="selectedKeys"
      data-test="outline-items__tree"
      :items="items"
      :mode="mode"
      @expanded="handleNodeExpand"
      @selected="handleNodeSelect"
    >
      <template #default="slotProps">
        <OutlineItem :data="slotProps.node.data" />
      </template>
    </OutlineGrid>
  </ScrollPanel>
</template>
