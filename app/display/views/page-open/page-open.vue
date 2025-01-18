<script setup lang="ts">
import { useI18n } from "@/display/i18n";

import AppFeatures from "./app-features.vue";
import InputLocale from "./input-locale.vue";
import OpenActions from "./open-actions.vue";
const { t } = useI18n();
</script>
<template>
  <div class="page-open">
    <div class="page-open-features page-open-panel">
      <AppFeatures />
    </div>
    <div class="page-open-divider" />
    <div class="page-open-actions page-open-panel">
      <h2>{{ t('open.title') }}</h2>
      <OpenActions />
      <InputLocale />
    </div>
  </div>
</template>
<style scoped>
.page-open {
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.page-open-panel {
  --padding: var(--size-fluid-2);
  padding-inline: var(--padding);

  @media (min-width: 768px) {
    padding-inline: 0;
  }
}

.page-open-divider {
  --border: var(--border-size-1) solid var(--p-primary-200);
  --margin: var(--size-fluid-4);
  flex: 0;

  border-block-start: var(--border);
  margin-block: var(--margin);

  @media (min-width: 768px) {
    border-block-start: 0;
    margin-block: 0;
    border-inline-start: var(--border);
    margin-inline: var(--margin);
  }
}

.page-open-actions {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: var(--size-6);
  justify-content: space-between;
}
</style>