<script setup lang="ts">
import type { Id, Node } from "@/domain";

import { Store } from "@/display/store";
import { EditorSwitcher, FrameDashboard, PanelCalendar } from "@/display/widgets";
import { MasterDetail } from "@/utils";
import { ref } from "vue";

const { nodes } = Store.use();

const selectedNode = ref<Node | undefined>();
const showDetail = ref(false);

function handleClose() {
  resetState();
}

function handleSelected(id?: string) {
  if (!id) {
    resetState();
    return;
  }

  selectedNode.value = solveNode(id);
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
      class="page-calendar"
    >
      <template #master>
        <PanelCalendar @selected="handleSelected" />
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
.page-calendar {
  height: 100%;
}
</style>