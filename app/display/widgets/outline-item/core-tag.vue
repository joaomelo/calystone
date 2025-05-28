<script setup lang="ts">
import { computed } from "vue";

import type { OutlineItemData } from "./outline-item-data";

import CoreBase from "./core-base.vue";

const { item } = defineProps<{
  item: OutlineItemData;
}>();

const label = computed(() => item.key);
const icon = "bx bx-sm bx-purchase-tag-alt";

</script>

<template>
  <CoreBase
    :icon="icon"
    :label="label"
  />
</template>