<script setup>
defineProps({
  clipped: { type: Boolean, default: false },
});
</script>
<template>
  <h1 class="text-heading" :class="{ clipped }"><slot></slot></h1>
</template>
<style scoped>
.text-heading {
  font-size: var(--font-size-15);
  font-weight: var(--font-weight-30);
}

.clipped {
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
