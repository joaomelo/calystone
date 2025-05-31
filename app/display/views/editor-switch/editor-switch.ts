import type { Component } from "vue";

export interface EditorSwitch {
  component: Component,
  supports: (content?: unknown) => boolean
};
