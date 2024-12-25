<script setup lang="ts">
import { useI18n } from "@/display/i18n";
import { Store } from "@/display/store";
import { InputTextarea, TextMessage } from "@/display/widgets";
import { asPattern } from "@/domain";
import { computed } from "vue";

const { t } = useI18n();
const state = Store.use();

const ignore = computed({
  get: () => state.ignore.pattern.join("\n"),
  set: (value: string) => void state.ignore.update(asPattern(value))
});
</script>
<template>
  <TextMessage severity="info">
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
