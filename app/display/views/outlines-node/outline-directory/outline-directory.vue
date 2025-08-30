<script setup lang="ts">
import type { Directory } from "@/domain";

import { computed } from "vue";

import { OutlineNode } from "../outline-node";

const { directory } = defineProps<{ directory: Directory; }>();

const icon = computed(() => {
  const iconPrefix = "bx bx-sm";
  const loadingEffect = directory.isBusy() ? "bx-flashing" : "";
  const iconGlyph = directory.isLoaded() ? "bxs-folder" : "bx-folder";
  return `${iconPrefix} ${loadingEffect} ${iconGlyph}`;
});
</script>
<template>
  <OutlineNode :node="directory">
    <template #icon>
      <i :class="icon" />
    </template>
  </OutlineNode>
</template>