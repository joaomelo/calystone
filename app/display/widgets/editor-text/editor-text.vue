<script setup lang="ts">
import type { TextArtifact } from "@/domain";

import { fetchArtifactText } from "@/domain";
import { onMounted, ref } from "vue";

import CodeMirror from "./code-mirror.vue";

const { node } = defineProps<{
  node: TextArtifact;
}>();

const text = ref("");
onMounted(async () => {
  text.value = await fetchArtifactText(node);
});

function handleUpdate(value: string) {
  // save to file
  console.log(value);
}
</script>
<template>
  <CodeMirror
    :model-value="text"
    @update:model-value="handleUpdate"
  />
</template>
