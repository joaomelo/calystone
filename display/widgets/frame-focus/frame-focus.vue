<script setup lang="ts">
import { FrameBase } from "../frame-base";
</script>
<template>
  <FrameBase>
    <div class="frame-focus">
      <slot />
    </div>
  </FrameBase>
</template>
<style scoped>
.frame-focus {
  min-height: 100vh;
  max-width: var(--size-15);
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: var(--p-surface-0);
}
</style>
