import { TextArtifact } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import EditorArtifactText from "./editor-artifact-text.vue";

export const editorArtifactTextSwitch: EditorSwitch = {
  component: EditorArtifactText,
  supports(content) {
    return content instanceof TextArtifact;
  }
};
