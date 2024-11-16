<script setup lang="ts">
import { DEFAULT_ACTIVITY } from "@/display/activities";
import { useI18n } from "@/display/i18n";
import { ButtonBase, TextMessage } from "@/display/widgets";
import { connectStore, createFsaConnection, useStore } from "@/domain";
import { useRouter } from "vue-router";

import LocaleSwitch from "./locale-switch.vue";

const router = useRouter();
const store = useStore();
const { t } = useI18n();

async function handleOpenFsa() {
  const root = await showDirectoryPicker();
  void connectStore(store, createFsaConnection(root));
  void router.push({ name: DEFAULT_ACTIVITY });
}
</script>
<template>
  <div class="page-open">
    <div class="page-open-panels">
      <div class="page-open-features">
        <TextMessage severity="warn">
          {{ t('features.warning') }}
        </TextMessage>
        <div>
          <h1>{{ t('features.title') }}</h1>
          <p>{{ t('features.description') }}</p>
        </div>
        <div>
          <ul>
            <li>
              <h2>{{ t('features.note-taking') }}</h2>
              <p>{{ t('features.note-taking-description') }}</p>
            </li>
            <li>
              <h2>{{ t('features.data-ownership') }}</h2>
              <p>{{ t('features.data-ownership-description') }}</p>
            </li>
            <li>
              <h2>{{ t('features.open-source') }}</h2>
              <i18n-t
                keypath="features.open-source-description"
                tag="p"
              >
                <a
                  href="https://github.com/joaomelo/calystone"
                  target="_blank"
                >GitHub</a>
              </i18n-t>
            </li>
          </ul>
        </div>
      </div>
      <div class="page-open-controls">
        <div class="page-open-controls-action">
          <ButtonBase
            :label="t('open-dir')"
            size="large"
            @click="handleOpenFsa"
          />
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

.page-open-features {
  display: flex;
  flex-direction: column;
  gap: var(--size-4);
  border-inline-end: var(--border-size-1) solid var(--p-primary-200);

  & ul {
    margin-inline-start: var(--size-3);
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
  }
}

.page-open-controls {
  display: flex;
  flex-direction: column;
}

.page-open-controls-action {
  display: grid;
  place-items: center;
  flex: 1
}
</style>