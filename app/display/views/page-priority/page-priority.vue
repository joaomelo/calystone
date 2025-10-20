<script setup lang="ts">

import { MasterDetail } from "@/display/affordances/master-detail";
import { EditorSwitcher } from "@/display/views/editors-node/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { useSelected } from "@/display/views/use-selected";

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
      class="page-priority"
      :model-value="hasSelected"
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