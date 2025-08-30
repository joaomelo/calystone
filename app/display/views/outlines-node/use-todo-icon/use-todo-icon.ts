import type { TodoArtifact } from "@/domain";

import { computed } from "vue";

export function useTodoIcon(todo: TodoArtifact) {
  return computed(() => {
    const iconPrefix = "bx bx-sm";
    const loadingEffect = todo.isBusy() ? "bx-flashing" : "";

    if (!todo.isLoaded()) {
      return `${iconPrefix} ${loadingEffect} bx-task`;
    }

    if (todo.completed()) {
      return `${iconPrefix} ${loadingEffect} bx-checkbox-checked`;
    }

    const iconGlyph = todo.progress() === "doing"
      ? "bx-checkbox-minus"
      : "bx-checkbox";

    return `${iconPrefix} ${loadingEffect} ${iconGlyph}`;
  });
}