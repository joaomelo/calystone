<script setup lang="ts">
import { InputSelectButton, useI18n } from "@/utils";

const { availableLocales, locale, t } = useI18n();

const options = availableLocales.map((locale) => ({
  label: locale,
  value: locale,
}));
</script>
<template>
  <InputSelectButton
    v-model="locale"
    :options="options"
    :label="t('page-open.language')"
    justify="center"
    data-test="input-locale"
  />
</template>
