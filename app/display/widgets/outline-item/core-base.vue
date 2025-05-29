<script setup lang="ts">
defineProps<{
  icon: string;
  label: string;
}>();
</script>
<template>
  <div class="core-base">
    <i :class="icon" />
    <div class="core-base__content">
      <p class="core-base__main_label">
        {{ label }}
      </p>
      <div class="core-base__meta">
        <slot name="meta" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.core-base {
  display: flex;
  gap: var(--size-1);
}

.core-base__content {
  display: flex;
  flex-direction: column;
  gap: var(--size-1);
}
</style>