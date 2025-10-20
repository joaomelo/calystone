<script setup lang="ts">
import { MasterDetail } from "@/display/affordances/master-detail";
import { EditorSwitcher } from "@/display/views/editors-node/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { useSelected } from "@/display/views/use-selected";

import OutlineFolders from "./outline-folders.vue";
import { useExpanded } from "./use-expanded";

const {
  hasSelected,
  selectedKeys,
  selectedNode,
  unselect
} = useSelected("folders-nodes-selected");
const expandedKeys = useExpanded(selectedKeys);
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      class="page-folders"
      :model-value="hasSelected"
    >
      <template #master>
        <OutlineFolders
          v-model:expanded-keys="expandedKeys"
          v-model:selected-keys="selectedKeys"
        />
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
.page-folders {
  height: 100%;
}
</style>