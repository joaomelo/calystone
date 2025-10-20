<script setup lang="ts">
import { MasterDetail } from "@/display/affordances/master-detail";
import { EditorSwitcher } from "@/display/views/editors-node/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { useSelected } from "@/display/views/use-selected";

import OutlineTags from "./outline-tags.vue";

const {
  hasSelected,
  selectedKeys,
  selectedNode,
  unselect
} = useSelected("tags-nodes-selected");
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      v-model="hasSelected"
      class="page-tags"
    >
      <template #master>
        <OutlineTags v-model:selected-keys="selectedKeys" />
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
.page-tags {
  height: 100%;
}
</style>