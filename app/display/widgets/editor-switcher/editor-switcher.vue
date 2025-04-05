<script setup lang="ts">
import type { Node } from "@/domain";
import type { Component } from "vue";

import { computed } from "vue";

import type { EditorSwitch } from "../editor-switch";

import { editorArtifactBinarySwitch } from "../editor-artifact-binary";
import { editorArtifactTextSwitch } from "../editor-artifact-text";
import { editorDirectorySwitch } from "../editor-directory";
import { editorEmptySwitch } from "../editors-message";

const { node } = defineProps<{
  node?: Node;
}>();

// switches order matters since the first compatible switch will be used, so the most specific should be first.
const switchs: EditorSwitch[] = [editorEmptySwitch, editorDirectorySwitch, editorArtifactTextSwitch, editorArtifactBinarySwitch];
const editor: Component = computed(() => {
  const specializedSwitch = switchs.find((s) => s.supports(node));
  return specializedSwitch?.component ?? editorEmptySwitch.component;
});

// key is important to force the component to be recreated when the node changes and the inner editor is async. without key, editor text, for example, does not update the text content.
const key = computed(() => node?.id ?? "empty");
</script>
<template>
  <component
    :is="editor"
    :key
    :content="node"
    v-bind="$attrs"
  />
</template>
