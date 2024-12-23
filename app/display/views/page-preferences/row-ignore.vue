<script setup lang="ts">
import { useI18n } from "@/display/i18n";
import { InputTextarea, TextMessage } from "@/display/widgets";
import { ref } from "vue";

const { t } = useI18n();

const ignore = ref();
</script>
<template>
  <TextMessage severity="info">
    <!-- {{ t('ignore-info') }} -->

    <i18n-t
      keypath="ignore-info"
      tag="TextMessage"
      scope="global"
    >
      <a
        href="https://en.wikipedia.org/wiki/Glob_(programming)"
        target="_blank"
      >Wikepedia</a>
    </i18n-t>
  </TextMessage>
  <InputTextarea
    v-model="ignore"
    :label="t('ignore')"
    rows="5"
  />
</template>
