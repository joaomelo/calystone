<script setup lang="ts">
import type { TextArtifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { InputRichText } from "@/utils";
import { debounce } from "lodash-es";
import { ref } from "vue";

const { content } = defineProps<{
  content: TextArtifact;
}>();

const { services } = Store.use();

const text = ref("");
await services.exchangeArtifact.fetch(content);
text.value = content.content ?? "";

// will save updates to the model after 1 second of inactivity
const handleUpdate = debounce(async (text: string) => {
  await services.exchangeArtifact.post({ artifact: content, text });
}, 1000);
</script>
<template>
  <EditorNodeWorkspace :node="content">
    <InputRichText
      data-test="editor-text"
      :model-value="text"
      @update:model-value="handleUpdate"
    />
  </EditorNodeWorkspace>
</template>
