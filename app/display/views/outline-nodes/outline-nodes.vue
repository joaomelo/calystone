<script setup lang="ts">
import type { Id, Nodes } from "@/domain";
import type { TreeGridExpandedKeys, TreeGridSelectionKeys } from "@/utils";

import { OutlineItem } from "@/display/views/outline-item";
import { ScrollPanel, TreeGrid } from "@/utils";
import { computed, ref } from "vue";

import { convert } from "./convert";

const { nodes } = defineProps<{
  nodes: Nodes // is important to use the reactive data structure with all nodes to trigger the reactivity system. passing a array with only the root objects will not secure ui updates for deeper nodes.
}>();
const emit = defineEmits<{
  expanded: [id: Id];
  selected: [id: Id | undefined];
}>();

const selectedKeys = ref<TreeGridSelectionKeys | undefined>();
const expandedKeys = ref<TreeGridExpandedKeys>({});

const items = computed(() =>
  nodes.list()
    .filter(n => n.isRoot())
    .map((root) => convert({ expanded: expandedKeys.value, node: root }))
);

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
