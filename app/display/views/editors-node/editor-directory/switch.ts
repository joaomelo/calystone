import { Directory } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import { default as EditorDirectory } from "./editor-directory.vue";

export const editorDirectorySwitch: EditorSwitch = {
  component: EditorDirectory,
  supports: content => content instanceof Directory,
};
