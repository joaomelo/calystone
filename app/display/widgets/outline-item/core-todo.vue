<script setup lang="ts">
import { TodoArtifact } from "@/domain";
import { throwCritical } from "@/utils";
import { computed } from "vue";

import type { OutlineItemData } from "./outline-item-data";

import CoreBase from "./core-base.vue";
import { useCoreNode } from "./use-core-node";

const { item } = defineProps<{
  item: OutlineItemData;
}>();

const { baseIcon, label, node } = useCoreNode(item);

const visuals = computed<{ icon: string; strikethrough: boolean }>(() => {
  if (!(node instanceof TodoArtifact)) {
    throwCritical("TODO_ARTIFACT_EXPECTED");
  }

  if (!node.isLoaded()) {
    return {
      icon: `${baseIcon.value} bx-task`,
      strikethrough: false
    };
  }

  if (node.completed()) {
    return {
      icon: `${baseIcon.value} bx-checkbox-checked`,
      strikethrough: true
    };
  }

  const iconGlyph = node.progress() === "doing"
    ? "bx-checkbox-minus"
    : "bx-checkbox";

  return {
    icon: `${baseIcon.value} ${iconGlyph}`,
    strikethrough: false
  };
});

</script>

<template>
  <CoreBase
    :class="{ 'strikethrough': visuals.strikethrough }"
    :icon="visuals.icon"
    :label="label"
  />
</template>

<style scoped>
.strikethrough :deep(.core-base__main_label) {
  text-decoration: line-through;
}
</style>
