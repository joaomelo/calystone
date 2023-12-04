<script setup>
import { VisualIcon } from "../visual-icon";
defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "var(--size-35)",
  },
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
  background-color: var(--background-color-hover);
}
</style>
