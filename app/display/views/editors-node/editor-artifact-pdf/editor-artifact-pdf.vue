<script setup lang="ts">
import {
  computed,
  onMounted
} from "vue";

import type { BinaryArtifact } from "@/domain";

import { Store } from "@/display/store";
import {
  debounce,
  InputPdf
} from "@/utils";

import { EditorNotLoaded } from "../editor-not-loaded";
import { EditorWorkspace } from "../editor-workspace";
import {
  ToolbarButtonExportNode,
  ToolbarButtonRemoveNode,
  ToolbarButtonRenameNode,
  ToolbarButtonShareNode
} from "../toolbar-buttons";

const { content: artifact } = defineProps<{ content: BinaryArtifact; }>();
defineEmits<{ close: [] }>();

const { services } = Store.use();

onMounted(() => services.exchangeArtifact.fetchInto(artifact));

const pdf = computed(() => {
  if (artifact.isUnloaded()) return undefined;
  return artifact.toBinary();
});

const handleUpdate = debounce(async (newContent: ArrayBuffer) => {
  artifact.fromBinary(newContent);
  await services.exchangeArtifact.postFrom(artifact);
});
</script>
<template>
  <EditorWorkspace
    v-if="pdf !== undefined"
    @close="$emit('close')"
  >
    <template #toolbar>
      <ToolbarButtonRenameNode
        :node="artifact"
      />
      <ToolbarButtonExportNode
        :node="artifact"
      />
      <ToolbarButtonShareNode
        :node="artifact"
      />
      <ToolbarButtonRemoveNode
        :node="artifact"
        @removed="$emit('close')"
      />
    </template>
    <InputPdf
      :cache-key="artifact.id"
      data-test="editor-pdf-input"
      :model-value="pdf"
      @update:model-value="handleUpdate"
    />
  </EditorWorkspace>
  <EditorNotLoaded v-else />
</template>
