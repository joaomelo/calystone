<script setup lang="ts">
import type { TextArtifact } from "@/domain";

import { Store } from "@/display/store";
// import { debounce } from "@/utils";
import {
  onMounted,
  ref
} from "vue";

import { EditorNotLoaded } from "../editor-not-loaded";
import { EditorWorkspace } from "../editor-workspace";
import {
  ToolbarButtonCreateArtifact,
  ToolbarButtonExportNode,
  ToolbarButtonRemoveNode,
  ToolbarButtonRenameNode,
  ToolbarButtonShareNode
} from "../toolbar-buttons";

const { content: artifact } = defineProps<{ content: TextArtifact; }>();
defineEmits<{ close: [] }>();

const { services } = Store.use();

const text = ref(artifact.content);

onMounted(async () => {
  await services.exchangeArtifact.fetchInto(artifact);
  text.value = artifact.content;
});

// const handleUpdate = debounce(async (text: string) => {
//   artifact.fromString(text);
//   await services.exchangeArtifact.postFrom(artifact);
// });
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
    <div class="stay-tunned">
      an pdf editor is in development. stay tunned
    </div>
  </EditorWorkspace>
  <EditorNotLoaded v-else />
</template>
<style scoped>
.stay-tunned {
  margin-block-start: var(--size-7);
  text-align: center;
}
</style>
