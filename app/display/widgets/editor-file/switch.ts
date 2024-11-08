import { isFile } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import { default as EditorFile } from "./editor-file.vue";

export const fileSwitch: EditorSwitch = {
  component: EditorFile,
  isCompatible: isFile
};
