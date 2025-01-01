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
          <div class="page-open-panels-start">
            <AppFeatures />
          </div>
          <div class="page-open-panels-end">
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