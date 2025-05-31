<script setup lang="ts">
import type { OutlineItemData } from "@/display/views/outline-item";
import type { Id, Node } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher } from "@/display/views/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { OutlineTags } from "@/display/views/outline-tags";
import { MasterDetail } from "@/utils";
import { ref } from "vue";

const { nodes } = Store.use();

const selectedNode = ref<Node | undefined>();
const showDetail = ref(false);

function handleClose() {
  resetState();
}

function handleSelected(data?: OutlineItemData) {
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
  showDetail.value = Boolean(selectedNode.value);
}

function resetState() {
  selectedNode.value = undefined;
  showDetail.value = false;
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
        <OutlineTags @selected="handleSelected" />
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