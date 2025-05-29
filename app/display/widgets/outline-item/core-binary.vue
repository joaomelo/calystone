<script setup lang="ts">
import type { BinaryArtifact } from "@/domain";

import { computed } from "vue";

import CoreBase from "./core-base.vue";

const { binary } = defineProps<{
  binary: BinaryArtifact;
}>();

const icon = computed(() => {
  const iconPrefix = "bx bx-sm";
  const loadingEffect = binary.isBusy() ? "bx-flashing" : "";
  const iconGlyph = binary.isLoaded() ? "bxs-file" : "bx-file";
  return `${iconPrefix} ${loadingEffect} ${iconGlyph}`;
});

</script>

<template>
  <CoreBase
    :icon="icon"
    :label="binary.name"
  />
</template>
