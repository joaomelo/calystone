<script setup lang="ts">
import type { OutlineGridKeys } from "@/utils";

import { Store } from "@/display/store";
import { EditorSwitcher } from "@/display/views/editor-switcher";
import { FrameDashboard } from "@/display/views/frame-dashboard";
import { MasterDetail } from "@/utils";
import {
  computed,
  ref
} from "vue";

import OutlinePriority from "./outline-priority.vue";

const { services } = Store.use();

const selectedKeys = ref<OutlineGridKeys>({});
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
      class="page-priority"
    >
      <template #master>
        <OutlinePriority v-model:selected-keys="selectedKeys" />
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
.page-priority {
  height: 100%;
}
</style>