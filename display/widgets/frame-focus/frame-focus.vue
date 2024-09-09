<script setup lang="ts">
import { FrameBase } from "../frame-base";
import LocaleSwitch from "./locale-switch.vue";
</script>
<template>
  <FrameBase>
    <div class="frame-focus">
      <div class="frame-focus-content">
        <slot />
      </div>
      <LocaleSwitch />
    </div>
  </FrameBase>
</template>
<style scoped>
.frame-focus {
  min-height: 100vh;
  max-width: var(--size-15);
  margin: auto;
  padding-block: var(--size-1);

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: var(--p-surface-0);
}

.frame-focus-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
