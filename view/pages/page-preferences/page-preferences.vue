<script setup>
import {
  ButtonBase,
  FormBase,
  InputBase,
  useDependencies,
  useI18n,
} from "@lib";
import { FrameDashboard, goOutline } from "@view";

const { t, i18n } = useI18n();
const dependencies = useDependencies();

const handleI18n = (locale) => i18n.updateLocale(locale);
const handleDone = () => goOutline(dependencies);
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
