import { TodoArtifact } from "@/domain";

import type { EditorSwitch } from "../editor-switch";

import EditorArtifactTodo from "./editor-artifact-todo.vue";

export const editorArtifactTodoSwitch: EditorSwitch = {
  component: EditorArtifactTodo,
  supports(content) {
    return content instanceof TodoArtifact;
  }
};
