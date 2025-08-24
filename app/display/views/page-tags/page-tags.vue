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

import OutlineTags from "./outline-tags.vue";

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
      class="page-tags"
    >
      <template #master>
        <OutlineTags v-model:selected-keys="selectedKeys" />
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
.page-tags {
  height: 100%;
}
</style>