<script setup lang="ts">
import InputTextPrimeVue from "primevue/inputtext";

import { InputWrapper } from "../input-wrapper";

const { autofocus = false } = defineProps<{
  autofocus?: boolean
  dataTest: string
}>();
const model = defineModel({ type: String });
</script>
<template>
  <InputWrapper :data-test="dataTest">
    <template #default="{ id, invalid, inputDataTest }">
      <InputTextPrimeVue
        :id="id"
        v-model="model"
        class="input-text"
        :autofocus="autofocus"
        :invalid="invalid"
        :data-test="inputDataTest"
      />
    </template>
  </InputWrapper>
</template>
<style scoped>
.input-text {
  width: 100%;
}
</style>