<script setup lang="ts">
import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { CardPanel } from "@/display/widgets";

import AppFeatures from "./app-features.vue";
import InputLocale from "./input-locale.vue";
import OpenDropbox from "./open-dropbox.vue";
import OpenFsa from "./open-fsa.vue";
import OpenGoogleDrive from "./open-google-drive.vue";
import OpenMemory from "./open-memory.vue";
import OpenOneDrive from "./open-one-drive.vue";

const { configuration } = Store.use();
const { t } = useI18n();
</script>
<template>
  <div class="page-open">
    <CardPanel>
      <template #content>
        <div class="page-open-panels">
          <div class="page-open-panels-features page-open-panels-panel">
            <AppFeatures />
          </div>
          <div class="page-open-panels-divider" />
          <div class="page-open-panels-actions page-open-panels-panel">
            <h2>{{ t('open.title') }}</h2>
            <div class="page-open-controls-actions">
              <OpenMemory v-if="configuration.is('enableMemory')" />
              <OpenGoogleDrive />
              <OpenOneDrive />
              <OpenDropbox />
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
  padding: var(--size-fluid-2);
}

.page-open-panels {
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.page-open-panels-panel {
  --padding: var(--size-fluid-2);
  padding-inline: var(--padding);

  @media (min-width: 768px) {
    padding-inline: 0;
  }
}

.page-open-panels-divider {
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

.page-open-panels-actions {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: var(--size-6);
  justify-content: space-between;
}

.page-open-controls-actions {
  display: grid;
  gap: var(--size-2);
  justify-content: center;
}
</style>