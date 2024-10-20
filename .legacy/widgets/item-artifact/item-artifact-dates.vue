<script setup>
import { useI18n } from "@lib";

defineProps({
  artifact: {
    required: true,
    type: Object,
  },
});

const { d } = useI18n();
</script>

<template>
  <div
    v-if="artifact.start || artifact.end"
    class="item-dates"
  >
    <span v-if="artifact.start">
      {{ d(artifact.start) }}
    </span>
    <span v-if="artifact.start && artifact.end"> - </span>
    <span v-if="artifact.end">
      {{ d(artifact.end) }}
    </span>
  </div>
</template>

<style scoped>
.item-dates {
  font-size: var(--font-size-10);
  color: var(--color-content-30);
}
</style>
