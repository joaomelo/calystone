<script setup lang="ts">
import {
  computed,
  onMounted,
  ref
} from "vue";

import type { BinaryArtifact } from "@/domain";

import { InputPdf } from "@/display/affordances/input-pdf";
import { Store } from "@/display/store";
import { debounce } from "@/utils";

import { EditorNotLoaded } from "../editor-not-loaded";
import { EditorWorkspace } from "../editor-workspace";
import {
  ToolbarButtonExportNode,
  ToolbarButtonRemoveNode,
  ToolbarButtonRenameNode,
  ToolbarButtonShareNode
} from "../toolbar-buttons";
import ToolbarButtonsZoom from "./toolbar-buttons-zoom.vue";

const { content: artifact } = defineProps<{ content: BinaryArtifact; }>();
defineEmits<{ close: [] }>();

const { services } = Store.use();

onMounted(() => services.exchangeArtifact.fetchInto(artifact));

const pdf = computed(() => {
  if (artifact.isUnloaded()) return undefined;
  const binary = artifact.toBinary();
  return binary;
});

const zoom = ref(1);

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
      <ToolbarButtonsZoom v-model="zoom" />
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
      :zoom="zoom"
      @update:model-value="handleUpdate"
    />
  </EditorWorkspace>
  <EditorNotLoaded v-else />
</template>
