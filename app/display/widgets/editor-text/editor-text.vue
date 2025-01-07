<script setup lang="ts">
import type { Artifact } from "@/domain";

import { TextCodec } from "@/domain";
import { Exception, throwCritical } from "@/utils";
import { debounce } from "lodash-es";
import { onMounted, ref } from "vue";

import { useExceptionToast } from "../toast";
import CodeMirror from "./code-mirror.vue";

const { node } = defineProps<{
  node: Artifact;
}>();

const toast = useExceptionToast();

const textCodec = new TextCodec(node);
const text = ref("");
onMounted(async () => {
  try {
    if (node.mime.type() !== "text") throwCritical("INVALID_MIME_TYPE_FOR_EDITOR", "the artifact must have text content");
    text.value = await textCodec.fetch();
  } catch (cause) {
    const exception = new Exception("UNABLE_FETCH_CONTENT", cause);
    toast(exception);
  }
});

// will save updates to the model after 1 second of inactivity
const handleUpdate = debounce(async (newText: string) => {
  try {
    await textCodec.post(newText);
  } catch (error) {
    const exception = new Exception("UNABLE_POST_CONTENT", error);
    toast(exception);
  }
}, 1000);
</script>
<template>
  <CodeMirror
    data-test="editor-text"
    :model-value="text"
    @update:model-value="handleUpdate"
  />
</template>
