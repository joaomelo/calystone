import { Artifact } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import { default as EditorText } from "./editor-text.vue";

export const editorTextSwitch: EditorSwitch = {
  component: EditorText,
  supports(content) {
    if (!(content instanceof Artifact)) return false;
    return content.mime.type() === "text";
  }
};
