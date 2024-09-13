<script setup lang="ts">
import { useI18n } from "@display/i18n";
import { FrameFocus } from "@display/widgets";

const { t } = useI18n();
</script>
<template>
  <FrameFocus>
    <p>{{ t('connect') }}</p>
  </FrameFocus>
</template>
