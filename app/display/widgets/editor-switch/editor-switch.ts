import type { Artifact } from "@/domain";
import type { Component } from "vue";

export interface EditorSwitch {
  component: Component,
  isCompatible: (artifact?: Artifact) => boolean
};