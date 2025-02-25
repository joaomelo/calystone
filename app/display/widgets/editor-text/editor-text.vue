<script setup lang="ts">
import type { Artifact } from "@/domain";

import { Store } from "@/display/store";
import { EditorWorkspace } from "@/display/widgets/editor-workspace";
import { throwCritical } from "@/utils";
import { debounce } from "lodash-es";
import { ref } from "vue";

import CodeMirror from "./code-mirror.vue";

const { content } = defineProps<{
  content: Artifact;
}>();

if (content.mime.type() !== "text") throwCritical("INVALID_MIME_TYPE_FOR_EDITOR", "the artifact must have text content");

const { service } = Store.use();

const text = ref("");
text.value = await service.text.fetch(content);

// will save updates to the model after 1 second of inactivity
const handleUpdate = debounce(async (text: string) => {
  await service.text.post({ artifact: content, text });
}, 1000);
</script>
<template>
  <EditorWorkspace>
    <CodeMirror
      data-test="editor-text"
      :model-value="text"
      @update:model-value="handleUpdate"
    />
  </EditorWorkspace>
</template>
