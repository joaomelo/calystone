import type { EditorSwitch } from "../editor-switch";

import EditorEmpty from "./editor-empty.vue";

export const emptySwitch: EditorSwitch = {
  component: EditorEmpty,
  isCompatible(node?) {
    return node === undefined;
  }
};
