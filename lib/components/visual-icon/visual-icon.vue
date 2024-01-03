<script setup>
defineProps({
  name: {
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
  <span class="visual-icon material-symbols-outlined">{{ name }}</span>
</template>
<style>
/* both classes are combined to increase specificity and override the font stylesheet font-size */
.visual-icon.material-symbols-outlined {
  font-size: v-bind(size);
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24;
}
</style>
