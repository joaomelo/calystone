<script setup>
import { FrameFocus } from "../frame-focus";
</script>
<template>
  <frame-focus>
    <div class="frame-message">
      <slot />
    </div>
  </frame-focus>
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
