<script setup lang="ts">
import { EditorSwitcher } from "@/display/views/editors-node/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { useSelected } from "@/display/views/use-selected";
import { MasterDetail } from "@/utils";

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
      :model-value="hasSelected"
      class="page-folders"
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