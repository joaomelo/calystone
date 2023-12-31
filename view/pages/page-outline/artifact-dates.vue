<script setup>
import { useI18n } from "@lib";
defineProps({
  artifact: {
    type: Object,
    required: true,
  },
});

const { d } = useI18n();
</script>
<template>
  <div v-if="artifact.start || artifact.end" class="artifact-dates">
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
.artifact-dates {
  font-size: var(--font-size-10);
  color: var(--color-neutral-40);
}
</style>
