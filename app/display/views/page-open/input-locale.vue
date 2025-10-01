<script setup lang="ts">
import {
  InputRadio,
  useI18n
} from "@/utils";

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
