<script setup lang="ts">
import { EditorSwitcher } from "@/display/views/editors-node/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { useSelected } from "@/display/views/use-selected";
import { MasterDetail } from "@/utils";

import OutlineSearch from "./outline-search.vue";

const {
  hasSelected,
  selectedKeys,
  selectedNode,
  unselect
} = useSelected("search-nodes-selected");
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      :model-value="hasSelected"
      class="page-search"
    >
      <template #master>
        <OutlineSearch v-model:selected-keys="selectedKeys" />
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
.page-search {
  height: 100%;
}
</style>