<script setup lang="ts">
import AppFeatures from "./app-features.vue";
import LocaleSwitch from "./locale-switch.vue";
import OpenFsa from "./open-fsa.vue";
</script>
<template>
  <div class="page-open">
    <div class="page-open-panels">
      <div>
        <AppFeatures />
      </div>
      <div class="page-open-controls">
        <div class="page-open-controls-actions">
          <OpenFsa />
        </div>
        <LocaleSwitch />
      </div>
    </div>
  </div>
</template>
<style scoped>
.page-open {
  min-height: 100vh;
  background-color: var(--p-surface-100);
  display: grid;
  place-items: center;
  padding: var(--size-6);
}

.page-open-panels {
  margin: auto;
  display: flex;
  background-color: var(--p-surface-0);
}

.page-open-panels>* {
  flex: 1;
  padding-block: var(--size-6);
  padding-inline: var(--size-6);
}

.page-open-controls {
  display: flex;
  flex-direction: column;
}

.page-open-controls-actions {
  display: grid;
  place-items: center;
  flex: 1
}
</style>