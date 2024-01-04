<script setup>
import { isFinished } from "@body";
defineProps({
  artifact: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div v-if="isFinished(artifact)" class="outline-item-status">
    {{ artifact.status }}
  </div>
</template>

<style scoped>
.outline-item-status {
  font-size: var(--font-size-10);
  color: var(--color-content-30);
}
</style>
