<script setup lang="ts">
import { computed } from "vue";

import type { OutlineItemData } from "./outline-item-data";

import CoreBase from "./core-base.vue";
import { useCoreNode } from "./use-core-node";

const { item } = defineProps<{
  item: OutlineItemData;
}>();

const { baseIcon, label, node } = useCoreNode(item);

const icon = computed(() => {
  const iconGlyph = node.isLoaded() ? "bxs-folder" : "bx-folder";
  return `${baseIcon.value} ${iconGlyph}`;
});

</script>

<template>
  <CoreBase
    :icon="icon"
    :label="label"
  />
</template>