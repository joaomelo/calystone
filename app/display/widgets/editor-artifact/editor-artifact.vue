<script setup lang="ts">
import type { Artifact } from "@/domain";
import type { Component } from "vue";

import { computed } from "vue";

import type { EditorSwitch } from "../editor-switch";

import { directorySwitch } from "../editor-directory";
import { EditorEmpty } from "../editor-empty";
import { fileSwitch } from "../editor-file";
import { textSwitch } from "../editor-text";

const { artifact } = defineProps<{
  artifact?: Artifact;
}>();

// switches order matters since the first compatible switch will be used, so the most specific should be first.
const switchs: EditorSwitch[] = [directorySwitch, textSwitch, fileSwitch];
const editor: Component = computed(() => {
  const specializedSwitch = switchs.find((s) => s.isCompatible(artifact));
  return specializedSwitch?.component ?? EditorEmpty;
});
</script>
<template>
  <div class="editor-artifact">
    <component
      :is="editor"
      :artifact
    />
  </div>
</template>
<style scoped>
.editor-artifact {
  height: 100%;
  padding: var(--size-3);
}
</style>