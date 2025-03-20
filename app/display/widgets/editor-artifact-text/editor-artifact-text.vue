<script setup lang="ts">
import type { Artifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorNodeWorkspace } from "@/display/widgets/editor-node-workspace";
import { InputRichText, throwCritical } from "@/utils";
import { debounce } from "lodash-es";
import { ref } from "vue";

const { content } = defineProps<{
  content: Artifact;
  remove: boolean;
  rename: boolean;
  share: boolean;
}>();

if (content.mime.type() !== "text") throwCritical("INVALID_MIME_TYPE_FOR_EDITOR", "the artifact must have text content");

const { service } = Store.use();

const text = ref("");
text.value = await service.artifactText.fetch(content);

// will save updates to the model after 1 second of inactivity
const handleUpdate = debounce(async (text: string) => {
  await service.artifactText.post({ artifact: content, text });
}, 1000);
</script>
<template>
  <EditorNodeWorkspace
    :remove
    :share
    :rename
  >
    <InputRichText
      data-test="editor-text"
      :model-value="text"
      @update:model-value="handleUpdate"
    />
  </EditorNodeWorkspace>
</template>
