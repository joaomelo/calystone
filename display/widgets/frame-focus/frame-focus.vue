<script setup lang="ts">
import LocaleSwitch from "./locale-switch.vue";
</script>
<template>
  <div class="frame-focus">
    <div class="frame-focus-content">
      <div class="frame-focus-content-controls">
        <slot />
      </div>
      <LocaleSwitch />
    </div>
  </div>
</template>
<style scoped>
.frame-focus {
  min-height: 100vh;
  background-color: var(--p-surface-100);
}

.frame-focus-content {
  min-height: 100vh;
  max-width: var(--size-15);
  margin: auto;
  padding-block: var(--size-1);

  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: var(--p-surface-0);
}

.frame-focus-content-controls {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
