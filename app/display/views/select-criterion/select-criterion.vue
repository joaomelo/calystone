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
  const labels = Array.from(services.queryCriteria.labels());
  labels.sort((a, b) => a.localeCompare(b));
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