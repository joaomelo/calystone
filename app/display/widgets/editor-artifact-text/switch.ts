import { Artifact } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import EditorArtifactText from "./editor-artifact-text.vue";

export const editorArtifactTextSwitch: EditorSwitch = {
  component: EditorArtifactText,
  supports(content) {
    if (!(content instanceof Artifact)) return false;
    return content.mime.type() === "text";
  }
};
