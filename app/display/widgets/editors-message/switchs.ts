import type { EditorSwitch } from "@/display/widgets/editor-switch";

import { Artifact, Node } from "@/domain";

import EditorEmpty from "./editor-empty.vue";
import EditorNotLoaded from "./editor-not-loaded.vue";

export const editorEmptySwitch: EditorSwitch = {
  component: EditorEmpty,
  supports(content) {
    return content === undefined;
  }
};

export const editorNotLoadedSwitch: EditorSwitch = {
  component: EditorNotLoaded,
  supports(content) {
    if (!(content instanceof Node)) return false;
    if (content instanceof Artifact && content.mime.type() === "binary") return false;
    return content.status !== "loaded";
  }
};
