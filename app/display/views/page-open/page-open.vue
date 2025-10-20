<script setup lang="ts">
import { useI18n } from "@/display/affordances/i18n";
import { Frameplain } from "@/display/views/frame-plain";

import AppFeatures from "./app-features.vue";
import AppVersion from "./app-version.vue";
import InputLocale from "./input-locale.vue";
import OpenActions from "./open-actions.vue";

const { t } = useI18n();
</script>
<template>
  <Frameplain>
    <div class="page-open">
      <section>
        <h1>{{ t('page-open.title') }}</h1>
      </section>
      <section>
        <h2>{{ t('page-open.actions.title') }}</h2>
        <OpenActions />
        <InputLocale />
      </section>
      <section>
        <AppFeatures />
        <AppVersion />
      </section>
    </div>
  </Frameplain>
</template>
<style scoped>
.page-open {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  & section {
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
  }

  & h1 {
    font-size: var(--font-size-5);
  }

  & h2 {
    font-size: var(--font-size-2);
  }

  & h1,
  & h2 {
    text-align: center;
  }
}
</style>