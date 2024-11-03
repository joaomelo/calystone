<script setup lang="ts">
import type { Artifact } from "@/domain";

import { isDirectory, isFile } from "@/domain";
import { computed } from "vue";

import { EditorDirectory } from "../editor-directory";
import { EditorEmpty } from "../editor-empty";
import { EditorFile } from "../editor-file";

const { artifact } = defineProps<{
  artifact?: Artifact;
}>();

const editor = computed(() => {
  if (isDirectory(artifact)) return EditorDirectory;
  if (isFile(artifact)) return EditorFile;
  return EditorEmpty;
});
</script>
<template>
  <component
    :is="editor"
    :artifact
  />
</template>