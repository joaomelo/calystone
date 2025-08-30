<script setup lang="ts">
import type { TextArtifact } from "@/domain";

import { truncate } from "@/utils";
import { computed } from "vue";

import { OutlineNode } from "../outline-node";

const { text } = defineProps<{ text: TextArtifact; }>();

const icon = computed(() => {
  const iconPrefix = "bx bx-sm";
  const loadingEffect = text.isBusy() ? "bx-flashing" : "";
  const iconGlyph = text.isLoaded() ? "bxs-file-txt" : "bx-file-blank";
  return `${iconPrefix} ${loadingEffect} ${iconGlyph}`;
});

const excerpt = computed(() => {
  if (!text.content) return "";

  return truncate(text.content, {
    ellipsis: "...",
    length: 30
  });
});
</script>
<template>
  <OutlineNode :node="text">
    <template #icon>
      <i :class="icon" />
    </template>
    <template #meta>
      <div class="outline-text__excerpt">
        {{ excerpt }}
      </div>
    </template>
  </OutlineNode>
</template>
<style scoped>
.outline-text__excerpt {
  font-size: var(--font-size-0);
}
</style>