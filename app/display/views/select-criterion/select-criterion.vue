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
  const prioritizer = todos.prioritizer();
  const { labels } = prioritizer;
  return labels.map(label => ({
    label,
    value: label
  }));
});
</script>
<template>
  <InputSelect
    v-model="model"
    data-test="select-criterion"
    :label="t('common.criterion')"
    :options="options"
    show-clear
  />
</template>