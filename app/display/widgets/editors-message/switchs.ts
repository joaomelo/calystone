import type { EditorSwitch } from "@/display/widgets/editor-switch";

import { Node } from "@/domain";

import EditorEmpty from "./editor-empty.vue";
import EditorError from "./editor-error.vue";
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

export const editorErrorSwitch: EditorSwitch = {
  component: EditorError,
  supports(content) {
    return content instanceof Error;
  }
};
