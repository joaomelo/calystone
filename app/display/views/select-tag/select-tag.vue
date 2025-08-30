<script setup lang="ts">
import { Store } from "@/display/store";
import {
  InputSelect,
  useI18n
} from "@/utils";
import { computed } from "vue";

const { t } = useI18n();

const model = defineModel<string | undefined>({ default: undefined });

const { services } = Store.use();
const options = computed(() => {
  const tags = services.computeTags.compute();
  const names = tags.names();
  names.sort((a, b) => a.localeCompare(b));
  return names.map(name => ({
    label: name,
    value: name
  }));
});
</script>
<template>
  <InputSelect
    v-model="model"
    :label="t('common.tag')"
    data-test="select-tag"
    :options="options"
    show-clear
  />
</template>