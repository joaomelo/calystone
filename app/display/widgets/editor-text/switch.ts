import { Artifact } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import { default as EditorText } from "./editor-text.vue";

export const textSwitch: EditorSwitch = {
  component: EditorText,
  isCompatible(node?) {
    if (!(node instanceof Artifact)) return false;
    return node.mime.type() === "text";
  }
};
