<script setup lang="ts">
import InputNumberPrimeVue from "primevue/inputnumber";

import { InputWrapper } from "../input-wrapper";

const { buttons = false, disabled = false, locale = "en", size } = defineProps<{
  buttons?: boolean
  dataTest: string
  disabled?: boolean
  locale?: string
  size?: "large" | "small"
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
        :invalid="invalid"
        :data-test="inputDataTest"
        fluid
        :locale="locale"
        :show-buttons="buttons"
        :size="size"
        button-layout="horizontal"
        :disabled="disabled"
      />
    </template>
  </InputWrapper>
</template>
