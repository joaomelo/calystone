<script setup>
import { onMounted, ref, watch } from "vue";

import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from "@codemirror/language";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { drawSelection, EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";

import { InputWrapper } from "../input-wrapper";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue"]);

const parent = ref(null);

let editorView = null;
onMounted(() => {
  const initialState = EditorState.create({
    extensions: [
      EditorView.lineWrapping,
      history(),
      drawSelection(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      markdown(),
      EditorView.updateListener.of((v) => {
        if (v.docChanged) {
          emit("update:modelValue", editorView.state.doc.toString());
        }
      }),
    ],
    doc: props.modelValue,
  });

  editorView = new EditorView({
    parent: parent.value,
    state: initialState,
  });
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === editorView.state.doc.toString()) return;
    const update = editorView.state.update({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: newValue,
      },
    });
    editorView.update([update]);
  },
);
</script>
<template>
  <input-wrapper>
    <template #default="{ id }">
      <div
        :id="id"
        ref="parent"
        class="parent"
      />
    </template>
  </input-wrapper>
</template>
<style scoped>
.parent {
  width: 100%;
  min-height: var(--size-60);

  display: flex;
  justify-content: center;
  align-items: stretch;

  border: var(--input-border);
}
.parent :deep(.cm-editor) {
  flex-grow: 1;
}

.parent :deep(.cm-scroller) {
  font-family: inherit;
}

.parent :deep(.cm-focused) {
  outline: var(--input-outline-focus);
}
</style>
