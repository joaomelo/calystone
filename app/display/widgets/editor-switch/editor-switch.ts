import type { Node } from "@/domain";
import type { Component } from "vue";

export interface EditorSwitch {
  component: Component,
  isCompatible: IsCompatible
};

export type IsCompatible = (node?: Node) => boolean;