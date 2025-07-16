<script setup lang="ts">
import MultiSelectPrimeVue from "primevue/multiselect";

import { InputWrapper } from "../input-wrapper";

const { label } = defineProps<{
  dataTest: string
  label?: string;
  options: string[] | {
    label: string;
    value: string
  }[];
}>();
defineEmits(["added"]);
const model = defineModel<string[]>();

</script>
<template>
  <InputWrapper
    :label
    :data-test="dataTest"
  >
    <template #default="{ id, inputDataTest }">
      <MultiSelectPrimeVue
        v-model="model"
        :input-id="id"
        :options="options"
        option-label="label"
        option-value="value"
        display="chip"
        filter
        fluid
        :data-test="inputDataTest"
      />
    </template>
  </InputWrapper>
</template>
