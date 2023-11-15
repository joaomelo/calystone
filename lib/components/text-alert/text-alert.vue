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
  gap: var(--size-10);
  padding-block: var(--size-00);
  padding-inline: var(--size-10);
  background-color: var(--color-neutral-60);
  border: var(--border-size-10) solid var(--color-neutral-40);
}

.text-alert-icon {
  color: var(--color-neutral-40);
}
</style>
