<script setup lang="ts">
import { computed } from "vue";

import { Store } from "@/display/store";
import {
  InputSelect,
  useI18n
} from "@/utils";

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