import type { EditorSwitch } from "../editor-switch";

import EditorNotLoaded from "./editor-not-loaded.vue";

export const notLoadedSwitch: EditorSwitch = {
  component: EditorNotLoaded,
  isCompatible(node?) {
    return node !== undefined && node.status !== "loaded";
  }
};
