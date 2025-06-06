import type { EditorSwitch } from "@/display/views/editor-switch";

import EditorEmpty from "./editor-empty.vue";

export const editorEmptySwitch: EditorSwitch = {
  component: EditorEmpty,
  supports(content) {
    return content === undefined;
  }
};