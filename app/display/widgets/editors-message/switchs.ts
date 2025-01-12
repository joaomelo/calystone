import type { EditorSwitch } from "@/display/widgets/editor-switch";

import { Node } from "@/domain";

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
    return content instanceof Node && content.status !== "loaded";
  }
};
