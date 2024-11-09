<script setup lang="ts">
import type { FileText } from "@/domain";

import { fetchText } from "@/domain";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import {
  bracketMatching,
  defaultHighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language";
import {
  highlightSelectionMatches,
} from "@codemirror/search";
import { EditorState } from "@codemirror/state";
import {
  drawSelection,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { onMounted, onUnmounted, ref, useTemplateRef } from "vue";

const { artifact } = defineProps<{
  artifact: FileText;
}>();

const editorTextElement = useTemplateRef("editorText");
const text = ref("");
let editorView: EditorView;

onMounted(async () => {
  if (!editorTextElement.value) return;

  text.value = await fetchText(artifact);

  const initialState = EditorState.create({
    doc: text.value,
    extensions: [
      lineNumbers(),
      EditorView.lineWrapping,
      highlightActiveLineGutter(),
      history(),
      drawSelection(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      markdown(),
      EditorView.updateListener.of((v) => {
        if (v.docChanged) {
          // emit("changed", editorView.state.doc.toString());
        }
      }),
    ],
  });

  editorView = new EditorView({
    parent: editorTextElement.value,
    state: initialState,
  });
});
onUnmounted(() => {
  editorView.destroy();
});
</script>
<template>
  <div
    ref="editorText"
    class="editor-text"
  />
</template>
<style scoped>
.editor-text {
  max-height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.editor-text :deep(.cm-editor) {
  flex-grow: 1;
}

.editor-text :deep(.cm-focused) {
  outline: none;
}
</style>