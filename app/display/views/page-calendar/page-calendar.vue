<script setup lang="ts">
import { EditorSwitcher } from "@/display/views/editors-node/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { useSelected } from "@/display/views/use-selected";
import { MasterDetail } from "@/utils";

import OutlineCalendar from "./outline-calendar.vue";

const {
  hasSelected,
  selectedKeys,
  selectedNode,
  unselect
} = useSelected("calendar-nodes-selected");
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      class="page-calendar"
      :model-value="hasSelected"
    >
      <template #master>
        <OutlineCalendar v-model:selected-keys="selectedKeys" />
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
.page-calendar {
  height: 100%;
}
</style>