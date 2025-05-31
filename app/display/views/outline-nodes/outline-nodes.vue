<script setup lang="ts">
import type { Id } from "@/domain";
import type { TreeGridSelectionKeys } from "@/utils";

import { OutlineItem } from "@/display/views/outline-item";
import { ScrollPanel, TreeGrid } from "@/utils";
import { ref } from "vue";

import { useItems } from "./use-items";

const emit = defineEmits<{
  expanded: [id: Id];
  selected: [id: Id | undefined];
}>();

const { expandedKeys, items } = useItems();

const selectedKeys = ref<TreeGridSelectionKeys | undefined>();

function handleNodeExpand(key: string) {
  emit("expanded", key);
}

function handleNodeSelect(key?: string) {
  emit("selected", key);
}
</script>
<template>
  <ScrollPanel>
    <TreeGrid
      v-model:expanded-keys="expandedKeys"
      v-model:selected-keys="selectedKeys"
      data-test="nodes-outline-tree"
      :items="items"
      @expanded="handleNodeExpand"
      @selected="handleNodeSelect"
    >
      <template #default="slotProps">
        <OutlineItem :item="slotProps.node.data" />
      </template>
    </TreeGrid>
  </ScrollPanel>
</template>
