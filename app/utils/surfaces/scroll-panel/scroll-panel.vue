<script setup lang="ts">
import { useAutoScroll } from "./use-auto-scroll";

const {
  containerRef,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
} = useAutoScroll();
</script>
<template>
  <div
    ref="containerRef"
    class="scroll-panel"
    @dragover="handleDragOver"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <slot />
  </div>
</template>
<style scoped>
.scroll-panel {
  height: 100%;
  overflow-y: auto;
}
</style>
