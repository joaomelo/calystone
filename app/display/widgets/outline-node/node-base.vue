<script setup lang="ts">
defineProps<{
  icon: string
  label: string
}>();
</script>
<template>
  <div class="node-base">
    <i :class="icon" />
    <p>{{ label }}</p>
  </div>
</template>
<style scoped>
.node-base {
  display: flex;
  gap: var(--size-1)
}
</style>