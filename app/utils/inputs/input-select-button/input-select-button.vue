<script setup lang="ts">
import SelectButton from "primevue/selectbutton";

import { InputWrapper } from "../input-wrapper";

const { label } = defineProps<{
  dataTest: string
  label?: string;
  options: string[];
}>();
const model = defineModel({ type: String });

</script>
<template>
  <InputWrapper
    :label
    :data-test="dataTest"
  >
    <template #default="{ id }">
      <SelectButton
        :id="id"
        v-model="model"
        :options="options"
        :allow-empty="false"
      />
    </template>
  </InputWrapper>
</template>
<style scoped></style>