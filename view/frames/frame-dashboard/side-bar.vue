<script setup>
import { name, version } from "@main/../package.json";
import { useI18n, InputBase, useTask } from "@lib";
import { useBody } from "@body";
import { useDisplay } from "@view/display";

const display = useDisplay();
const { t, i18n } = useI18n();
const { gate } = useBody();
const handleUpdate = (locale) => i18n.updateLocale(locale);

const signOut = useTask(async () => {
  await gate.signOut();
  display.pageAuth();
});
</script>
<template>
  <aside class="side-bar">
    <section>
      <h1 class="side-bar-title">{{ name }}</h1>
    </section>
    <section>
      <span>plan</span>
      <span>search</span>
    </section>
    <section>
      <span class="side-bar-subtitle">{{ gate.userEmail }}</span>
      <span @click="signOut.run">{{ t("frame-dashboard.sign-out") }}</span>
    </section>
    <section>
      <input-base
        :options="i18n.supported"
        type="select"
        :model-value="i18n.locale"
        @update:model-value="handleUpdate"
      />
      <span>v{{ version }}</span>
    </section>
  </aside>
</template>
<style scoped>
.side-bar {
  display: flex;
  flex-direction: column;
  gap: var(--size-40);
}

.side-bar section {
  display: flex;
  flex-direction: column;
  gap: var(--size-15);
}

.side-bar-title {
  font-size: var(--font-size-30);
  font-weight: var(--font-weight-40);
}

.side-bar-subtitle {
  font-weight: var(--font-weight-30);
}
</style>
