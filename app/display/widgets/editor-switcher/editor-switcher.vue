<script setup lang="ts">
import type { EditorSwitch } from "@/display/widgets/editor-switch";
import type { Node } from "@/domain";
import type { Component } from "vue";

import { editorArtifactBinarySwitch } from "@/display/widgets/editor-artifact-binary";
import { editorArtifactTextSwitch } from "@/display/widgets/editor-artifact-text";
import { editorArtifactTodoSwitch } from "@/display/widgets/editor-artifact-todo";
import { editorDirectorySwitch } from "@/display/widgets/editor-directory";
import { editorEmptySwitch } from "@/display/widgets/editors-message";
import { ScrollPanel } from "@/utils";
import { computed } from "vue";

const { node } = defineProps<{
  node?: Node;
}>();

// switches order matters since the first compatible switch will be used, so the most specific should be first.
const switchs: EditorSwitch[] = [editorEmptySwitch, editorDirectorySwitch, editorArtifactTodoSwitch, editorArtifactTextSwitch, editorArtifactBinarySwitch];
const editor: Component = computed(() => {
  const specializedSwitch = switchs.find((s) => s.supports(node));
  return specializedSwitch?.component ?? editorEmptySwitch.component;
});

// key is important to force the component to be recreated when the node changes and the inner editor is async. without key, editor text, for example, does not update the text content.
const key = computed(() => node?.id ?? "empty");
</script>
<template>
  <ScrollPanel>
    <component
      :is="editor"
      :key
      :content="node"
      v-bind="$attrs"
    />
  </ScrollPanel>
</template>
