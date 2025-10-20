<script setup lang="ts">

import { useI18n } from "@/display/affordances/i18n";
import { InputRadio } from "@/display/affordances/input-radio";

const {
  availableLocales,
  locale,
  t
} = useI18n();

const options = availableLocales.map((locale) => ({
  label: locale,
  value: locale,
}));
</script>
<template>
  <InputRadio
    v-model="locale"
    centered
    data-test="input-locale"
    :label="t('page-open.language')"
    :options="options"
  />
</template>
