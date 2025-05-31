<script setup lang="ts">
import type { Directory } from "@/domain";

import { computed } from "vue";

import CoreBase from "./core-base.vue";

const { directory } = defineProps<{
  directory: Directory;
}>();

const icon = computed(() => {
  const iconPrefix = "bx bx-sm";
  const loadingEffect = directory.isBusy() ? "bx-flashing" : "";
  const iconGlyph = directory.isLoaded() ? "bxs-folder" : "bx-folder";
  return `${iconPrefix} ${loadingEffect} ${iconGlyph}`;
});

</script>

<template>
  <CoreBase
    :icon="icon"
    :label="directory.name"
  />
</template>