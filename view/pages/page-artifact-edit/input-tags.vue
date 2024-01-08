<script setup>
import { listTags } from "@body";
import { InputMultiselect, useDependencies, useI18n } from "@lib";

const model = defineModel({
  required: true,
  type: Array,
});

const dependencies = useDependencies();
const { t } = useI18n();

const allTags = listTags(dependencies);
const options = allTags.map(({ id, name }) => ({ text: name, value: id }));
</script>
<template>
  <input-multiselect
    id="input-tags"
    v-model="model"
    :label="t('page-tags.tags')"
    :options="options"
  />
</template>
