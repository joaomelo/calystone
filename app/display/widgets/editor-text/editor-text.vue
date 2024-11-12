<script setup lang="ts">
import type { Artifact } from "@/domain";

import { fetchArtifactText, isText } from "@/domain";
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

function handleUpdate(value: string) {
  // save to artifact
  console.log(value);
}
</script>
<template>
  <CodeMirror
    :model-value="text"
    @update:model-value="handleUpdate"
  />
</template>
