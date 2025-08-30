<script setup lang="ts">
import { Store } from "@/display/store";
import { EditorSwitcher } from "@/display/views/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { MasterDetail } from "@/utils";
import { computed } from "vue";

import OutlineFolders from "./outline-folders.vue";
import { useExpanded } from "./use-expanded";
import { useSelected } from "./use-selected";

const { services } = Store.use();

const selectedKeys = useSelected();
const expandedKeys = useExpanded(selectedKeys);

const maybeEditorNode = computed(() => {
  const [first] = Object.keys(selectedKeys.value);
  return services.retrieveNodes.get(first);
});

const showDetail = computed(() => Boolean(maybeEditorNode.value));

function handleClose() {
  selectedKeys.value = {};
}
</script>
<template>
  <FrameDashboard>
    <MasterDetail
      v-model="showDetail"
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
          :node="maybeEditorNode"
          @close="handleClose"
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