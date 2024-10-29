<script setup lang="ts">
import type { Artifact } from "@/domain";

import { computed } from "vue";

import { EditorDirectory } from "../editor-directory";
import { EditorEmpty } from "../editor-empty";
import { EditorFile } from "../editor-file";

const { artifact } = defineProps<{
  artifact?: Artifact;
}>();

const editor = computed(() => {
  if (!artifact) return EditorEmpty;
  if (artifact.type === "directory") return EditorDirectory;
  return EditorFile;
});

</script>
<template>
  <component
    :is="editor"
    :artifact
  />
</template>