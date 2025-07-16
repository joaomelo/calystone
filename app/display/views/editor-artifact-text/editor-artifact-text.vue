<script setup lang="ts">
import type { TextArtifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorWorkspace } from "@/display/views/editor-workspace";
import { EditorNotLoaded } from "@/display/views/editors-message";
import {
  ToolbarButtonCreateArtifact, ToolbarButtonExportNode, ToolbarButtonRemoveNode, ToolbarButtonRenameNode, ToolbarButtonShareNode
} from "@/display/views/toolbar-buttons";
import {
  debounce, InputRichText
} from "@/utils";
import {
  onMounted, ref
} from "vue";

const { content: artifact } = defineProps<{ content: TextArtifact; }>();
defineEmits<{ close: [] }>();

const { services } = Store.use();

const text = ref(artifact.content);

onMounted(async () => {
  await services.exchangeArtifact.fetchInto(artifact);
  text.value = artifact.content;
});

const handleUpdate = debounce(async (text: string) => {
  artifact.fromString(text);
  await services.exchangeArtifact.postFrom(artifact);
});
</script>
<template>
  <EditorWorkspace
    v-if="artifact.isLoaded()"
    :node="artifact"
    @close="$emit('close')"
  >
    <template #toolbar>
      <ToolbarButtonCreateArtifact
        :node="content"
      />
      <ToolbarButtonRenameNode
        :node="content"
      />
      <ToolbarButtonExportNode
        :node="content"
      />
      <ToolbarButtonShareNode
        :node="content"
      />
      <ToolbarButtonRemoveNode
        :node="content"
        @removed="$emit('close')"
      />
    </template>
    <InputRichText
      data-test="editor-text"
      :model-value="text"
      borderless
      @update:model-value="handleUpdate"
    />
  </EditorWorkspace>
  <EditorNotLoaded v-else />
</template>
