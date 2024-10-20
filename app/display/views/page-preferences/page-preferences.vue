<script setup lang="ts">
// import {
//   ButtonBase,
//   FormBase,
//   InputSelect,
//   useDependencies,
//   useI18n,
// } from "@/lib";
// import { FrameDashboard, goOutline } from "@/view";

// const { i18n, t } = useI18n();
// const dependencies = useDependencies();

// const handleI18n = locale => i18n.updateLocale(locale);
// const handleDone = () => goOutline(dependencies);
</script>
<template>
  <div>preferences</div>
  <!-- <frame-dashboard :title="t('shared.preferences')">
    <form-base @submit="handleDone">
      <template #default>
        <input-select
          id="input-locale"
          :label="t('shared.locale')"
          :model-value="i18n.locale"
          :options="i18n.supported"
          @update:model-value="handleI18n"
        />
      </template>
      <template #buttons>
        <button-base
          :label="t('shared.done')"
          type="submit"
        />
      </template>
    </form-base>
  </frame-dashboard> -->
</template>
