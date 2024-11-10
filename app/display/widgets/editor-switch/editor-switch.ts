import type { Node } from "@/domain";
import type { Component } from "vue";

export interface EditorSwitch {
  component: Component,
  isCompatible: (node?: Node) => boolean
};