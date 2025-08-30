<script setup lang="ts">
import type { BinaryArtifact } from "@/domain";

import { computed } from "vue";

import { OutlineNode } from "../outline-node";

const { binary } = defineProps<{ binary: BinaryArtifact; }>();

const icon = computed(() => {
  const iconPrefix = "bx bx-sm";
  const loadingEffect = binary.isBusy() ? "bx-flashing" : "";
  const iconGlyph = binary.isLoaded() ? "bxs-file" : "bx-file";
  return `${iconPrefix} ${loadingEffect} ${iconGlyph}`;
});
</script>
<template>
  <OutlineNode :node="binary">
    <template #icon>
      <i :class="icon" />
    </template>
  </OutlineNode>
</template>
