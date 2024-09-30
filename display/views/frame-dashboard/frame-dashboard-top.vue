<script setup>
defineProps({
  title: {
    default: null,
    type: String,
  },
});
</script>
<template>
  <nav class="frame-dashboard-top">
    <h1 class="frame-dashboard-top-title">
      {{ title }}
    </h1>
  </nav>
</template>
<style scoped>
.frame-dashboard-top {
  padding-block: var(--size-1);
  padding-inline: var(--size-1);

  border-bottom: var(--border-size-1) solid var(--p-surface-100);
}

.frame-dashboard-top-title {
  font-size: var(--font-size-4);
  font-weight: var(--font-weight-7);
  color: var(--p-primary-600)
}
</style>
