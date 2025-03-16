<script setup lang="ts">
import InputTextPrimeVue from "primevue/inputtext";

import { InputWrapper } from "../input-wrapper";

const { autofocus = false } = defineProps<{
  autofocus?: boolean
}>();
const model = defineModel({ type: String });
</script>
<template>
  <InputWrapper>
    <template #default="{ id, invalid }">
      <InputTextPrimeVue
        :id="id"
        v-model="model"
        class="input-text"
        :autofocus="autofocus"
        :invalid="invalid"
      />
    </template>
  </InputWrapper>
</template>
<style scoped>
.input-text {
  width: 100%;
}
</style>