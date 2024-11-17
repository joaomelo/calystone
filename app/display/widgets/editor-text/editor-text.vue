<script setup lang="ts">
import type { Artifact } from "@/domain";

import { onMounted, ref } from "vue";

import { TextCodec } from "../codec";
import CodeMirror from "./code-mirror.vue";

const { node } = defineProps<{
  node: Artifact;
}>();

const codec = new TextCodec();
const text = ref("");
onMounted(async () => {
  if (node.mime.type() !== "text") throw new Error("the artifact must have text content");
  const content = await node.fetch();
  text.value = codec.decode(content);
});

async function handleUpdate(newText: string) {
  const content = codec.encode(newText);
  await node.post(content);
}
</script>
<template>
  <CodeMirror
    :model-value="text"
    @update:model-value="handleUpdate"
  />
</template>
