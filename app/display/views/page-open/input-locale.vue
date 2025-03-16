<script setup lang="ts">
import { InputSelectButton, useI18n } from "@/utils";

const { availableLocales, locale, t } = useI18n();

</script>
<template>
  <InputSelectButton
    v-model="locale"
    :options="availableLocales"
    :label="t('language')"
    justify="center"
    data-test="input-locale"
  />
</template>
