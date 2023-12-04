<script setup>
import { useI18n, FormBase, InputBase, ButtonBase } from "@lib";
import { useDisplay } from "@view/display";
import { FrameDashboard } from "@view/frames";

const { t, i18n } = useI18n();
const display = useDisplay();

const handleI18n = (locale) => i18n.updateLocale(locale);
const handleDone = () => display.pageOutline();
</script>
<template>
  <frame-dashboard :title="t('page-preferences.preferences')">
    <form-base>
      <template #default>
        <input-base
          :label="t('page-preferences.locale')"
          :model-value="i18n.locale"
          type="select"
          :options="i18n.supported"
          @update:model-value="handleI18n"
        />
      </template>
      <template #buttons>
        <button-base :label="t('page-preferences.done')" @click="handleDone" />
      </template>
    </form-base>
  </frame-dashboard>
</template>
