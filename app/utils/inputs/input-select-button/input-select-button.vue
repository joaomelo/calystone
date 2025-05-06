<script setup lang="ts">
import SelectButton from "primevue/selectbutton";

import { InputWrapper } from "../input-wrapper";

const { label } = defineProps<{
  dataTest: string
  label?: string;
  options: { label: string; value: string }[];
}>();
const model = defineModel({ type: String });

</script>
<template>
  <InputWrapper
    :label
    :data-test="dataTest"
  >
    <template #default="{ id, inputDataTest }">
      <SelectButton
        :id="id"
        v-model="model"
        :data-test="inputDataTest"
        :options="options"
        :allow-empty="false"
        option-label="label"
        option-value="value"
        fluid
      />
    </template>
  </InputWrapper>
</template>
<style scoped></style>