<script setup>
import { VisualIcon } from "../visual-icon";
defineProps({
  icon: { type: String, required: true },
});
</script>
<template>
  <button class="button-icon">
    <visual-icon :name="icon" />
  </button>
</template>
<style scoped>
.button-icon {
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0;
}

.button-icon:hover {
  background-color: var(--color-neutral-60);
}
</style>
