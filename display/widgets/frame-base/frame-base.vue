<script setup lang="ts">
</script>
<template>
  <div class="frame-base">
    <slot />
  </div>
</template>
<style scoped>
.frame-base {
  min-height: 100vh;
  background-color: var(--p-surface-100);
}
</style>
