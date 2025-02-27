<script setup lang="ts">
import InputTextPrimeVue from "primevue/inputtext";

import { InputWrapper } from "../input-wrapper";

const { autofocus = false, label } = defineProps<{
  autofocus?: boolean
  label?: string;
  name: string;
}>();
const model = defineModel({ type: String });
</script>
<template>
  <InputWrapper :label>
    <template #default="{ id }">
      <InputTextPrimeVue
        :id="id"
        v-model="model"
        :name="name"
        class="input-text"
        :autofocus="autofocus"
      />
    </template>
  </InputWrapper>
</template>
<style scoped>
.input-text {
  width: 100%;
}
</style>