<script setup lang="ts">
import { useI18n } from "@/display/i18n";
import { InputTextarea } from "@/display/widgets";
import { ref } from "vue";

const { t } = useI18n();

const ignore = ref();
</script>
<template>
  <InputTextarea
    v-model="ignore"
    :label="t('ignore')"
    rows="5"
  />
</template>
