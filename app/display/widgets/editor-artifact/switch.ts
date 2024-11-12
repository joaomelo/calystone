import { isArtifact } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import { default as Editorartifact } from "./editor-artifact.vue";

export const artifactSwitch: EditorSwitch = {
  component: Editorartifact,
  isCompatible: isArtifact
};
