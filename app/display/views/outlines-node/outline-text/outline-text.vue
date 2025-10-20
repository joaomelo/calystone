<script setup lang="ts">
import { computed } from "vue";

import type { TextArtifact } from "@/domain";

import { AppIcon } from "@/display/affordances/icons";
import { truncate } from "@/utils";

import { OutlineNode } from "../outline-node";

const { text } = defineProps<{ text: TextArtifact; }>();

const animation = computed(() => {
  return text.isBusy() ? "pulse" : "none";
});

const name = computed(() => {
  return text.isLoaded() ? "file-text" : "file-dashed";
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
      <AppIcon
        :animation="animation"
        :name="name"
      />
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