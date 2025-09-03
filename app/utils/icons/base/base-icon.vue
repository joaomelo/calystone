<script setup lang="ts">
import { computed } from "vue";

const {
  animation = "none",
  color = "currentColor",
  duration = 1,
  size = "24px"
} = defineProps<{
  animation?: "none" | "pulse" | "spin"
  color?: string
  duration?: number,
  size?: string
}>();

const animationStyle = computed(() => {
  if (animation === "none") return {};

  return {
    animationDuration: `${Math.round(duration).toFixed(0)}s`,
    animationIterationCount: "infinite",
    animationName: animation,
    animationTimingFunction: animation === "pulse" ? "ease-in-out" : "linear"
  };
});
</script>
<template>
  <span
    class="base-icon"
    :style="animationStyle"
  >
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>