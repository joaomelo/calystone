<script setup lang="ts">
const {
  color = "currentColor",
  size = "24px"
} = defineProps<{
  color?: string
  size?: string
}>();
</script>
<template>
  <span class="base-icon">
    <slot />
  </span>
</template>
<style scoped>
.base-icon {
  display: inline-flex;
  width: v-bind(size);
  height: v-bind(size);
  color: v-bind(color);
}

.base-icon :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>