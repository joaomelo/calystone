<script setup>
defineProps({
  clipped: {
    default: false,
    type: Boolean,
  },
});
</script>
<template>
  <h1
    class="text-heading"
    :class="{ clipped }"
  >
    <slot />
  </h1>
</template>
<style scoped>
.text-heading {
  font-size: var(--font-size-15);
  font-weight: var(--font-weight-30);
}

.clipped {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
