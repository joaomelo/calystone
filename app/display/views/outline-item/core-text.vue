<script setup lang="ts">
import type { TextArtifact } from "@/domain";

import { computed } from "vue";

import CoreBase from "./core-base.vue";

const { text } = defineProps<{
  text: TextArtifact;
}>();

const icon = computed(() => {
  const iconPrefix = "bx bx-sm";
  const loadingEffect = text.isBusy() ? "bx-flashing" : "";
  const iconGlyph = text.isLoaded() ? "bxs-file-txt" : "bx-file-blank";
  return `${iconPrefix} ${loadingEffect} ${iconGlyph}`;
});

</script>

<template>
  <CoreBase
    :icon="icon"
    :label="text.name"
  />
</template>
