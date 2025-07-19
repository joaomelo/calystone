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
    :data-test="dataTest"
    class="input-number"
  >
    <InputLabel
      v-if="label"
      :label="label"
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
    />
    <InputNumberPrimeVue
      :id="id"
      v-model="model"
      :data-test="kebabCase(dataTest, 'input')"
      fluid
      :locale="locale"
      :show-buttons="buttons"
      :max="max"
      :min="min"
      :step="step"
      button-layout="horizontal"
      :disabled="disabled"
      :max-fraction-digits="maxFractionDigits"
      :min-fraction-digits="minFractionDigits"
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