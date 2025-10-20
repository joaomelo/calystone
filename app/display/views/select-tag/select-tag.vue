<script setup lang="ts">
import { computed } from "vue";

import { useI18n } from "@/display/affordances/i18n";
import { InputSelect } from "@/display/affordances/input-select";
import { Store } from "@/display/store";

const { t } = useI18n();

const model = defineModel<string | undefined>({ default: undefined });

const { services } = Store.use();
const todos = services.spawnCollections.todos();

const options = computed(() => {
  const tagger = todos.tagger();
  const { labels } = tagger;
  return labels.map(label => ({
    label,
    value: label
  }));
});
</script>
<template>
  <InputSelect
    v-model="model"
    data-test="select-tag"
    :label="t('common.tag')"
    :options="options"
    show-clear
  />
</template>