<script setup lang="ts">
import type { TextArtifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/views/editor-node-workspace";
import { EditorNotLoaded } from "@/display/views/editors-message";
import { debounce, InputRichText } from "@/utils";
import { onMounted, ref } from "vue";

const { content: artifact } = defineProps<{
  content: TextArtifact;
}>();

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
  <EditorNodeWorkspace
    v-if="artifact.isLoaded()"
    :node="artifact"
  >
    <InputRichText
      data-test="editor-text"
      :model-value="text"
      borderless
      @update:model-value="handleUpdate"
    />
  </EditorNodeWorkspace>
  <EditorNotLoaded v-else />
</template>
