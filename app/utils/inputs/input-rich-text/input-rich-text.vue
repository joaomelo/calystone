<script setup lang="ts">
import {
  autocompletion,
  closeBrackets
} from "@codemirror/autocomplete";
import {
  defaultKeymap,
  history,
  historyKeymap
} from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import {
  bracketMatching,
  defaultHighlightStyle,
  indentOnInput,
  syntaxHighlighting
} from "@codemirror/language";
import { highlightSelectionMatches, } from "@codemirror/search";
import { EditorState } from "@codemirror/state";
import {
  drawSelection,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import {
  onMounted,
  onUnmounted,
  useId,
  useTemplateRef,
  watch
} from "vue";

import { kebabCase } from "@/utils/text";

import { areTextEqual } from "./text-equality";

const {
  borderless = false,
  lineless = false
} = defineProps<{
  borderless?: boolean
  dataTest: string
  lineless?: boolean
}>();

const model = defineModel<string>({ required: true });

const id = useId();

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

    const update = editorView.state.update({ changes: {
      from: 0,
      insert: newContent,
      to: editorView.state.doc.length,
    }, });
    editorView.update([update]);
  }
);
</script>
<template>
  <div :data-test="dataTest">
    <div
      :id="id"
      ref="codeMirror"
      class="input-rich-text__input"
      :class="{ borderless, lineless }"
      :data-test="kebabCase(dataTest, 'input')"
    />
  </div>
</template>
<style scoped>
.input-rich-text__input {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  font-family: inherit;

  & :deep(*) {
    font-family: inherit;
  }
}

.input-rich-text__input:not(.borderless) {
  border: 1px solid var(--p-form-field-border-color);
  border-radius: var(--p-form-field-border-radius);
  padding-block: var(--p-form-field-padding-y);

  /* the padding is smaller at the start because every line already has some padding */
  padding-inline-start: 0.25rem;
  padding-inline-end: var(--p-form-field-padding-x);

  &:focus-within {
    border-color: var(--p-form-field-focus-border-color);
    box-shadow: var(--p-form-field-focus-ring-shadow);
    outline: var(--p-form-field-focus-ring-width) var(--p-form-field-focus-ring-style) var(--p-form-field-focus-ring-color);
    outline-offset: var(--p-form-field-focus-ring-offset);
  }
}

.input-rich-text__input :deep(.cm-editor) {
  flex-grow: 1;
}

.input-rich-text__input :deep(.cm-focused) {
  outline: none;
}

.input-rich-text__input :deep(.cm-gutters) {
  background-color: revert;
  border-inline-end-color: var(--p-content-border-color);
  border-inline-end-style: dashed;
  color: var(--p-text-muted-color);
}

.input-rich-text__input :deep(.cm-content) {
  padding-block-start: 0;
}
</style>