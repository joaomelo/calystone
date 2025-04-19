<script setup lang="ts">
import InputCheckboxPrimeVue from "primevue/checkbox";

import { InputWrapper } from "../input-wrapper";

defineProps<{
  dataTest: string
}>();
const model = defineModel<boolean>({ required: true });
</script>
<template>
  <InputWrapper
    :data-test="dataTest"
    direction="row-reverse"
  >
    <template #default="{ id, invalid, inputDataTest }">
      <InputCheckboxPrimeVue
        v-model="model"
        :input-id="id"
        binary
        variant="filled"
        class="input-check"
        :invalid="invalid"
        :data-test="inputDataTest"
      />
    </template>
  </InputWrapper>
</template>
<style scoped>
.input-check {
  width: 100%;
}
</style>