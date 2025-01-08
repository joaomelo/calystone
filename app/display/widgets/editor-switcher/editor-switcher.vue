<script setup lang="ts">
import type { Node } from "@/domain";
import type { Component } from "vue";

import { computed, onErrorCaptured, ref, watch } from "vue";

import type { EditorSwitch } from "../editor-switch";

import { editorArtifactSwitch } from "../editor-artifact";
import { editorDirectorySwitch } from "../editor-directory";
import { editorTextSwitch } from "../editor-text";
import { editorEmptySwitch, editorErrorSwitch, editorNotLoadedSwitch } from "../editors-message";

const { node } = defineProps<{
  node?: Node;
}>();

const error = ref<Error>();
watch(() => node, () => error.value = undefined);
onErrorCaptured((capturedError) => {
  console.log({ capturedError });
  error.value = capturedError;
  return false;
});

const content = computed(() => error.value ?? node);

// switches order matters since the first compatible switch will be used, so the most specific should be first.
const switchs: EditorSwitch[] = [editorEmptySwitch, editorErrorSwitch, editorNotLoadedSwitch, editorDirectorySwitch, editorTextSwitch, editorArtifactSwitch];
const editor: Component = computed(() => {
  console.log({ content: content.value });
  const specializedSwitch = switchs.find((s) => s.supports(content.value));
  console.log({ specializedSwitch });
  return specializedSwitch?.component ?? editorEmptySwitch.component;
});

// key is important to force the component to be recreated when the node changes and the inner editor is async. without key, editor text, for example, does not update the text content.
const key = computed(() => node?.id ?? "empty");
</script>
<template>
  <div class="editor-node">
    <Suspense>
      <template #default>
        <component
          :is="editor"
          :key
          :content
        />
      </template>
      <template #fallback>
        <component
          :is="editorNotLoadedSwitch.component"
          :key
          :content
        />
      </template>
    </Suspense>
  </div>
</template>
<style scoped>
.editor-node {
  height: 100%;
}
</style>