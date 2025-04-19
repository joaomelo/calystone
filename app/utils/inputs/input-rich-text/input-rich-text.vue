<script setup lang="ts">
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from "@codemirror/language";
import { highlightSelectionMatches, } from "@codemirror/search";
import { EditorState } from "@codemirror/state";
import { drawSelection, EditorView, highlightActiveLine, highlightActiveLineGutter, keymap, lineNumbers, } from "@codemirror/view";
import { onMounted, onUnmounted, useTemplateRef, watch } from "vue";

import { InputWrapper } from "../input-wrapper";
import { areTextEqual } from "./text-equality";

const { borderless = false, lineless = false } = defineProps<{
  borderless?: boolean
  dataTest: string
  lineless?: boolean
}>();

const model = defineModel<string>({ required: true });

const codeMirrorElement = useTemplateRef("codeMirror");
let editorView: EditorView;

onMounted(() => {
  if (!codeMirrorElement.value) return;

  const lineConfiguration = lineless
    ? []
    : [lineNumbers(), highlightActiveLine(), highlightActiveLineGutter()];

  const initialState = EditorState.create({
    doc: model.value,
    extensions: [
      ...lineConfiguration,
      EditorView.lineWrapping,
      history(),
      drawSelection(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
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
  <InputWrapper :data-test="dataTest">
    <template #default="{ id, inputDataTest }">
      <div
        :id="id"
        ref="codeMirror"
        class="input-rich-text"
        :class="{ borderless, lineless }"
        :data-test="inputDataTest"
      />
    </template>
  </InputWrapper>
</template>
<style scoped>
.input-rich-text {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  font-family: inherit;

  & :deep(*) {
    font-family: inherit;
  }
}

.input-rich-text:not(.borderless) {
  border: 1px solid var(--p-form-field-border-color);
  border-radius: var(--p-form-field-border-radius);
  padding-block: var(--p-form-field-padding-y);
  padding-inline: var(--p-form-field-padding-x);

  & :deep(.cm-line) {
    padding-inline: 0;
  }

  &:focus-within {
    border-color: var(--p-form-field-focus-border-color);
    box-shadow: var(--p-form-field-focus-ring-shadow);
    outline: var(--p-form-field-focus-ring-width) var(--p-form-field-focus-ring-style) var(--p-form-field-focus-ring-color);
    outline-offset: var(--p-form-field-focus-ring-offset);
  }
}

.input-rich-text :deep(.cm-editor) {
  flex-grow: 1;
}

.input-rich-text :deep(.cm-focused) {
  outline: none;
}

.input-rich-text :deep(.cm-gutters) {
  background-color: revert;
  border-inline-end-color: var(--p-content-border-color);
  border-inline-end-style: dashed;
  color: var(--p-text-muted-color);
}

.input-rich-text :deep(.cm-content) {
  padding-block-start: 0;
}
</style>