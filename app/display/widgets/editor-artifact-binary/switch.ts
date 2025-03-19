import { Artifact } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import EditorArtifactBinary from "./editor-artifact-binary.vue";

export const editorArtifactBinarySwitch: EditorSwitch = {
  component: EditorArtifactBinary,
  supports: (content) => content instanceof Artifact
};
