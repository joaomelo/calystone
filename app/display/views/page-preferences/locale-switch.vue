<script setup lang="ts">
import { useI18n } from "@/display/i18n";
import { InputSelectButton } from "@/display/widgets";

const { availableLocales, locale, t } = useI18n();

</script>
<template>
  <div class="locale-switch">
    <InputSelectButton
      v-model="locale"
      :options="availableLocales"
      :label="t('language')"
    />
  </div>
</template>
