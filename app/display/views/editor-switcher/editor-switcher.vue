<script setup lang="ts">
import type { EditorSwitch } from "@/display/views/editor-switch";
import type { Node } from "@/domain";
import type { Component } from "vue";

import { Store } from "@/display/store";
import { editorArtifactBinarySwitch } from "@/display/views/editor-artifact-binary";
import { editorArtifactTextSwitch } from "@/display/views/editor-artifact-text";
import { editorArtifactTodoSwitch } from "@/display/views/editor-artifact-todo";
import { editorDirectorySwitch } from "@/display/views/editor-directory";
import { editorEmptySwitch } from "@/display/views/editors-message";
import { ScrollPanel } from "@/utils";
import { computed } from "vue";

const { node } = defineProps<{
  node?: Node;
}>();

const { services } = Store.use();

// switches order matters since the first compatible switch will be used, so the most specific should be first.
const switchs: EditorSwitch[] = [editorEmptySwitch, editorDirectorySwitch, editorArtifactTodoSwitch, editorArtifactTextSwitch, editorArtifactBinarySwitch];

const editor: Component = computed(() => {
  // if the node was removed from the collection, this will secure a empty editor.
  const normalizedNode = node
    ? services.retrieveNodes.get(node.id)
    : undefined;

  const specializedSwitch = switchs.find((s) => s.supports(normalizedNode));
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
