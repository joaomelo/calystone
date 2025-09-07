<script setup lang="ts">
import type { Node } from "@/domain";
import type { Component } from "vue";

import { Store } from "@/display/store";
import { ScrollPanel } from "@/utils";
import { computed } from "vue";

import type { EditorSwitch } from "../editor-switch";

import { editorArtifactBinarySwitch } from "../editor-artifact-binary";
import { editorArtifactPdfSwitch } from "../editor-artifact-pdf";
import { editorArtifactTextSwitch } from "../editor-artifact-text";
import { editorArtifactTodoSwitch } from "../editor-artifact-todo";
import { editorDirectorySwitch } from "../editor-directory";
import { editorEmptySwitch } from "../editor-empty";

const { node } = defineProps<{ node?: Node; }>();

const { services } = Store.use();

// switches order matters since the first compatible switch will be used, so the most specific should be first.
const switchs: EditorSwitch[] = [
  editorEmptySwitch,
  editorDirectorySwitch,
  editorArtifactTodoSwitch,
  editorArtifactTextSwitch,
  editorArtifactPdfSwitch,
  editorArtifactBinarySwitch
];

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
