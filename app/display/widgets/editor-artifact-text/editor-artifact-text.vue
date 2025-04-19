<script setup lang="ts">
import type { TextArtifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { EditorNotLoaded } from "@/display/widgets/editors-message";
import { debounce, InputRichText } from "@/utils";
import { onMounted, ref } from "vue";

const { content: artifact } = defineProps<{
  content: TextArtifact;
}>();

const { services } = Store.use();

const text = ref(artifact.content);

onMounted(async () => {
  text.value = await services.exchangeText.fetchInto(artifact);
});

const handleUpdate = debounce(async (text: string) => {
  await services.exchangeText.postFrom({ artifact, text });
}, 1000);
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
