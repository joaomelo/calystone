<script setup lang="ts">
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from "@codemirror/language";
import { highlightSelectionMatches, } from "@codemirror/search";
import { EditorState } from "@codemirror/state";
import { drawSelection, EditorView, highlightActiveLine, highlightActiveLineGutter, keymap, lineNumbers, } from "@codemirror/view";
import { onMounted, onUnmounted, useTemplateRef, watch } from "vue";

import { areTextEqual } from "./text-equality";

const model = defineModel<string>({ required: true });

const codeMirrorElement = useTemplateRef("codeMirror");
let editorView: EditorView;

onMounted(() => {
  if (!codeMirrorElement.value) return;
  const initialState = EditorState.create({
    doc: model.value,
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
          const editorText = editorView.state.doc.toString();
          if (areTextEqual(editorText, model.value)) return;

          model.value = editorText;
        }
      }),
    ],
  });

  editorView = new EditorView({
    parent: codeMirrorElement.value,
    state: initialState,
  });
});

onUnmounted(() => {
  editorView.destroy();
});

watch(
  () => model.value,
  (newContent) => {
    if (areTextEqual(newContent, editorView.state.doc.toString())) return;

    const update = editorView.state.update({
      changes: {
        from: 0,
        insert: newContent,
        to: editorView.state.doc.length,
      },
    });
    editorView.update([update]);
  }
);
</script>
<template>
  <div
    ref="codeMirror"
    class="code-mirror"
  />
</template>
<style scoped>
.code-mirror {
  max-height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
}

.code-mirror :deep(.cm-editor) {
  flex-grow: 1;
}

.code-mirror :deep(.cm-focused) {
  outline: none;
}
</style>