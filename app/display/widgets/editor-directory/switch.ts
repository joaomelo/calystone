import { isDirectory } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import { default as EditorDirectory } from "./editor-directory.vue";

export const directorySwitch: EditorSwitch = {
  component: EditorDirectory,
  isCompatible: isDirectory
};
