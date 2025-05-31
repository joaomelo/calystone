<script setup lang="ts">
import type { Item, ItemData } from "@/display/views/outline-item";
import type { TreeGridExpandedKeys, TreeGridItem, TreeGridSelectionKeys } from "@/utils";

import { isItemData } from "@/display/views/outline-item";
import { OutlineItem } from "@/display/views/outline-item";
import { ScrollPanel, TreeGrid } from "@/utils";
import { ref } from "vue";

defineProps<{
  expandedKeys: TreeGridExpandedKeys;
  items: Item[];
}>();
const emit = defineEmits<{
  expanded: [itemData: ItemData];
  selected: [itemData: ItemData | undefined];
}>();

const selectedKeys = ref<TreeGridSelectionKeys | undefined>();

function handleNodeExpand(item: TreeGridItem) {
  if (!isItemData(item.data)) return;
  emit("expanded", item.data);
}

function handleNodeSelect(item?: TreeGridItem) {
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
    <TreeGrid
      v-model:expanded-keys="expandedKeys"
      v-model:selected-keys="selectedKeys"
      data-test="outline-items__tree"
      :items="items"
      @expanded="handleNodeExpand"
      @selected="handleNodeSelect"
    >
      <template #default="slotProps">
        <OutlineItem :data="slotProps.node.data" />
      </template>
    </TreeGrid>
  </ScrollPanel>
</template>
