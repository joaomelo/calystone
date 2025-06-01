<script setup lang="ts">
import type { ItemData } from "@/display/views/outline-item";
import type { Id, Node } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher } from "@/display/views/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { OutlineItems } from "@/display/views/outline-items";
import { MasterDetail } from "@/utils";
import { computed, ref } from "vue";

import { useItems } from "./use-items";

const { nodes } = Store.use();
const { expandedKeys, items } = useItems();

const selectedNode = ref<Node | undefined>();
const showDetail = computed(() => Boolean(selectedNode.value));

function handleClose() {
  resetState();
}

function handleSelected(data?: ItemData) {
  if (!data) {
    resetState();
    return;
  }

  const { key, type } = data;
  if (type === "tag") {
    resetState();
    return;
  }

  selectedNode.value = solveNode(key);
}

function resetState() {
  selectedNode.value = undefined;
}

function solveNode(id: Id) {
  const node = nodes.get(id);
  return node;
}
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      v-model="showDetail"
      class="page-tags"
    >
      <template #master>
        <OutlineItems
          data-test="page-tags__outline-items"
          :expanded-keys="expandedKeys"
          :items="items"
          mode="tree"
          @selected="handleSelected"
        />
      </template>
      <template #detail>
        <EditorSwitcher
          :node="selectedNode"
          @close="handleClose"
        />
      </template>
    </MasterDetail>
  </FrameDashboard>
</template>
<style scoped>
.page-tags {
  height: 100%;
}
</style>