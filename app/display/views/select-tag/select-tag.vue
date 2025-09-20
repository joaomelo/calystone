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
  const globalTagger = services.computeTags.compute();
  const labels = globalTagger.labels();
  return labels.map(label => ({
    label,
    value: label
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