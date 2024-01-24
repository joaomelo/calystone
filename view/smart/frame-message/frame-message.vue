<script setup>
import { FrameBase } from "../frame-base";
</script>
<template>
  <frame-base>
    <div class="frame-message">
      <slot />
    </div>
  </frame-base>
</template>
<style scoped>
.frame-message {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-15);
  text-align: center;
}
</style>
