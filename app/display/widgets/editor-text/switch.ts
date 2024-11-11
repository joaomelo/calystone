import { isTextArtifact } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import { default as EditorText } from "./editor-text.vue";

export const textSwitch: EditorSwitch = {
  component: EditorText,
  isCompatible: isTextArtifact
};
