<script setup lang="ts">
import { CardPanel } from "@/display/widgets";

import AppFeatures from "./app-features.vue";
import EarlyDevelopment from "./early-development.vue";
import InputLocale from "./input-locale.vue";
import OpenFsa from "./open-fsa.vue";
</script>
<template>
  <div class="page-open">
    <CardPanel>
      <template #content>
        <div class="page-open-panels">
          <div class="page-open-panels-start">
            <AppFeatures />
          </div>
          <div class="page-open-panels-end">
            <EarlyDevelopment />
            <div class="page-open-controls-actions">
              <OpenFsa />
            </div>
            <InputLocale />
          </div>
        </div>
      </template>
    </CardPanel>
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
  display: flex;
}

.page-open-panels>* {
  flex: 1;
  padding-block: var(--size-6);
  padding-inline: var(--size-6);
}

.page-open-panels-start {
  border-inline-end: var(--border-size-1) solid var(--p-primary-200);
}

.page-open-panels-end {
  display: flex;
  flex-direction: column;
}

.page-open-controls-actions {
  display: grid;
  place-items: center;
  flex: 1
}
</style>