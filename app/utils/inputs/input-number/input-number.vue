<script setup lang="ts">
import { kebabCase } from "@/utils/text";
import InputNumberPrimeVue from "primevue/inputnumber";
import { useId, } from "vue";

import { InputLabel } from "../input-label";

const {
  buttons = false,
  disabled = false,
  locale = "en",
} = defineProps<{
  buttons?: boolean
  dataTest: string
  disabled?: boolean
  label?: string
  locale?: string
  max?: number
  maxFractionDigits?: number
  min?: number
  minFractionDigits?: number
  step?: number
}>();
const model = defineModel({ type: Number });

const id = useId();

</script>
<template>
  <div
    class="input-number"
    :data-test="dataTest"
  >
    <InputLabel
      v-if="label"
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
      :label="label"
    />
    <InputNumberPrimeVue
      :id="id"
      v-model="model"
      button-layout="horizontal"
      :data-test="kebabCase(dataTest, 'input')"
      :disabled="disabled"
      fluid
      :locale="locale"
      :max="max"
      :max-fraction-digits="maxFractionDigits"
      :min="min"
      :min-fraction-digits="minFractionDigits"
      :show-buttons="buttons"
      :step="step"
    />
  </div>
</template>
<style scoped>
.input-number {
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}
</style>