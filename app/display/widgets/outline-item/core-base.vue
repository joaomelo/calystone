<script setup lang="ts">
defineProps<{
  icon: string;
  label: string;
}>();
</script>
<template>
  <div class="core-base">
    <div class="core-base__main">
      <i :class="icon" />
      <p class="core-base__main_label">
        {{ label }}
      </p>
    </div>
    <div class="core-base__suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>
<style scoped>
.core-base__main {
  display: flex;
  gap: var(--size-1)
}
</style>