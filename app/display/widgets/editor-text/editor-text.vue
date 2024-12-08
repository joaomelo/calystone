<script setup lang="ts">
import type { Artifact } from "@/domain";

import { Exception } from "@/utils";
import { onMounted, ref } from "vue";

import { TextCodec } from "../codec";
import { useExceptionToast } from "../toast";
import CodeMirror from "./code-mirror.vue";

const { node } = defineProps<{
  node: Artifact;
}>();

const toast = useExceptionToast();

const codec = new TextCodec();
const text = ref("");
onMounted(async () => {
  if (node.mime.type() !== "text") throw new Error("the artifact must have text content");
  const content = await node.fetch();
  text.value = codec.decode(content);
});

async function handleUpdate(newText: string) {
  const content = codec.encode(newText);
  try {
    await node.post(content);
  } catch (error) {
    const exception = new Exception("UNABLE_POST_CONTENT", error);
    toast(exception);
  }
}
</script>
<template>
  <CodeMirror
    :model-value="text"
    @update:model-value="handleUpdate"
  />
</template>
