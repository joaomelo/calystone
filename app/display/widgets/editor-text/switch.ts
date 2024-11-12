import { isArtifact, isText } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import { default as EditorText } from "./editor-text.vue";

export const textSwitch: EditorSwitch = {
  component: EditorText,
  isCompatible(node?) {
    if (!node) return false;
    if (!isArtifact(node)) return false;
    return isText(node);
  }
};
