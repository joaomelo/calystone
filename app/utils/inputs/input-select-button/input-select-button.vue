<script setup lang="ts">
import SelectButton from "primevue/selectbutton";

import { InputWrapper } from "../input-wrapper";

const { disabled = false, label } = defineProps<{
  dataTest: string
  disabled?: boolean
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
        :disabled="disabled"
        :options="options"
        :allow-empty="false"
        option-label="label"
        option-value="value"
        fluid
      />
    </template>
  </InputWrapper>
</template>