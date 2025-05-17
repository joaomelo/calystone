<script setup lang="ts">
import type { Node } from "@/domain";

import { EditorSwitcher, FrameDashboard, PanelSearch } from "@/display/widgets";
import { MasterDetail } from "@/utils";
import { computed, ref } from "vue";

const selectedNode = ref<Node | undefined>();
const showDetail = computed(() => Boolean(selectedNode.value));

function handleClose() {
  selectedNode.value = undefined;
}

function handleSelected(node?: Node) {
  selectedNode.value = node;
}
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      v-model="showDetail"
      class="page-search"
    >
      <template #master>
        <PanelSearch @selected="handleSelected" />
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
.page-search {
  height: 100%;
}
</style>