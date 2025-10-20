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