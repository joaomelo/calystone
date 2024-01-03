<script setup>
import { VisualIcon } from "@lib";
defineProps({
  icon: { type: String, default: null },
  text: { type: String, default: null },
});
</script>
<template>
  <div class="text-alert">
    <visual-icon v-if="icon" :name="icon" class="text-alert-icon" />
    <span>
      {{ text }}
    </span>
  </div>
</template>
<style scoped>
.text-alert {
  display: flex;
  align-items: center;
  gap: var(--size-15);
  padding-block: var(--size-15);
  padding-inline: var(--size-15);
  background-color: var(--color-surface-20);
  border: var(--size-00) solid var(--color-surface-40);
}

.text-alert-icon {
  color: var(--color-content-40);
}
</style>
