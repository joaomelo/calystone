<script setup lang="ts">
import { useI18n } from "@/display/i18n";
import { TextMessage } from "@/display/widgets";

const { t } = useI18n();
</script>
<template>
  <TextMessage severity="warn">
    {{ t('early-development') }}
  </TextMessage>
</template>