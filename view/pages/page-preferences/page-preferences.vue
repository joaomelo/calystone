<script setup>
import { useI18n } from "@lib";
import { FrameDashboard } from "@view/frames";

const { t } = useI18n();
// const handleUpdate = (locale) => i18n.updateLocale(locale);
</script>
<template>
  <frame-dashboard :title="t('page-preferences.preferences')">
    preferences
    <!-- <form-base :error="edit.error" @submit="edit.run">
      <template #default>
        <input-base
          :options="i18n.supported"
          type="select"
          :model-value="i18n.locale"
          @update:model-value="handleUpdate"
        />
      </template>
      <template #buttons>
        <button-base type="submit" :label="t('save')" :busy="edit.busy" />
        <button-base :label="t('cancel')" @click="push" />
      </template>
    </form-base> -->
  </frame-dashboard>
</template>
