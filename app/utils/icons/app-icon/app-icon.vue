<script setup lang="ts">
import { computed } from "vue";

import { svgIcons } from "../svg";

const {
  animation = "none",
  color = "currentColor",
  duration = 1,
  name,
  size = "24px",
} = defineProps<{
  animation?: "none" | "pulse" | "spin"
  color?: string
  duration?: number
  name: string
  size?: string
}>();

const durantionInSeconds = computed(() => `${Math.round(duration).toFixed(0)}s`);
</script>
<template>
  <span
    class="app-icon"
    :class="animation"
    v-html="svgIcons[name]"
  />
</template>
<style scoped>
.app-icon {
  display: inline-flex;
  width: v-bind(size);
  height: v-bind(size);
  color: v-bind(color);
}

.app-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.app-icon.spin {
  animation: spin v-bind(durantionInSeconds) linear infinite;
}

.app-icon.pulse {
  animation: pulse v-bind(durantionInSeconds) ease-in-out infinite;
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