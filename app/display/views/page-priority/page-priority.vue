<script setup lang="ts">

import { EditorSwitcher } from "@/display/views/editors-node/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { useSelected } from "@/display/views/use-selected";
import { MasterDetail } from "@/utils";

import OutlinePriority from "./outline-priority.vue";

const {
  hasSelected,
  selectedKeys,
  selectedNode,
  unselect
} = useSelected("priority-nodes-selected");
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      :model-value="hasSelected"
      class="page-priority"
    >
      <template #master>
        <OutlinePriority v-model:selected-keys="selectedKeys" />
      </template>
      <template #detail>
        <EditorSwitcher
          :node="selectedNode"
          @close="unselect"
        />
      </template>
    </MasterDetail>
  </FrameDashboard>
</template>
<style scoped>
.page-priority {
  height: 100%;
}
</style>