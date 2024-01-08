<script setup>
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, drawSelection, keymap } from "@codemirror/view";
import { onMounted, ref, watch } from "vue";

import { InputWrapper } from "../input-wrapper";

const props = defineProps({
  modelValue: {
    default: "",
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);

const parent = ref(null);

let editorView = null;
onMounted(() => {
  const initialState = EditorState.create({
    doc: props.modelValue,
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
        insert: newValue,
        to: editorView.state.doc.length,
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
