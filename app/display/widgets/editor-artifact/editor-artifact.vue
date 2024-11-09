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

// key is important to force the component to be recreated when the artifact changes and the inner editor is async. without key, editor text, for example, does not update the text content.
const key = computed(() => artifact?.id ?? "empty");
</script>
<template>
  <div class="editor-artifact">
    <Suspense>
      <template #default>
        <component
          :is="editor"
          :key
          :artifact
        />
      </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>
<style scoped>
.editor-artifact {
  height: 100%;
}
</style>