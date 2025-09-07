import { BinaryArtifact } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import EditorArtifactPdf from "./editor-artifact-pdf.vue";

export const editorArtifactPdfSwitch: EditorSwitch = {
  component: EditorArtifactPdf,
  supports(content) {
    if (!(content instanceof BinaryArtifact)) return false;
    return content.mime.subtype() === "pdf";
  }
};
