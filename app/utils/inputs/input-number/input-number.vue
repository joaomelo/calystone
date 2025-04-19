<script setup lang="ts">
import InputNumberPrimeVue from "primevue/inputnumber";

import { InputWrapper } from "../input-wrapper";

const { autofocus = false, buttons = false, locale = "en" } = defineProps<{
  autofocus?: boolean
  buttons?: boolean
  dataTest: string
  locale?: string
}>();
const model = defineModel({ type: Number });
</script>
<template>
  <InputWrapper :data-test="dataTest">
    <template #default="{ id, invalid, inputDataTest }">
      <InputNumberPrimeVue
        :id="id"
        v-model="model"
        class="input-number"
        :autofocus="autofocus"
        :invalid="invalid"
        :data-test="inputDataTest"
        fluid
        :locale="locale"
        :show-buttons="buttons"
        button-layout="horizontal"
      />
    </template>
  </InputWrapper>
</template>
