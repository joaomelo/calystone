import { Artifact } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import { default as Editorartifact } from "./editor-artifact.vue";

export const editorArtifactSwitch: EditorSwitch = {
  component: Editorartifact,
  supports: (content) => content instanceof Artifact
};
