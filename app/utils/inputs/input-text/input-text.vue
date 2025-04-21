<script setup lang="ts">
import InputTextPrimeVue from "primevue/inputtext";

import { InputWrapper } from "../input-wrapper";

defineProps<{
  autofocus?: boolean
  dataTest: string
}>();
const model = defineModel<string>();
</script>
<template>
  <InputWrapper :data-test="dataTest">
    <template #default="{ id, invalid, inputDataTest }">
      <InputTextPrimeVue
        :id="id"
        v-model="model"
        class="input-text"
        :invalid="invalid"
        :data-test="inputDataTest"
        fluid
        :autofocus="autofocus"
      />
    </template>
  </InputWrapper>
</template>
