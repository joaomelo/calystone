<script setup lang="ts">
import type { Artifact } from "@/domain";

import { fetchArtifactText, isText, postArtifactText } from "@/domain";
import { onMounted, ref } from "vue";

import CodeMirror from "./code-mirror.vue";

const { node } = defineProps<{
  node: Artifact;
}>();

const text = ref("");
onMounted(async () => {
  if (!isText(node)) throw new Error("the artifact must have text content");
  text.value = await fetchArtifactText(node);
});

async function handleUpdate(newText: string) {
  await postArtifactText(node, newText);
}
</script>
<template>
  <CodeMirror
    :model-value="text"
    @update:model-value="handleUpdate"
  />
</template>
