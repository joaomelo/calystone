<script setup lang="ts">
import { kebabCase } from "@/utils/text";
import SelectPrimeVue from "primevue/select";
import { useId } from "vue";

import { InputLabel } from "../input-label";

interface Option {
  label: string;
  value: string;
}

const {
  disabled = false,
  label,
  showClear = false
} = defineProps<{
  dataTest: string
  disabled?: boolean
  label?: string;
  options: Option[];
  showClear?: boolean;
}>();
const model = defineModel({ type: String });

const id = useId();
</script>
<template>
  <div
    :data-test="dataTest"
    class="input-select"
  >
    <InputLabel
      v-if="label"
      :label="label"
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
    />
    <SelectPrimeVue
      :id="id"
      v-model="model"
      :data-test="kebabCase(dataTest, 'input')"
      :disabled="disabled"
      :options="options"
      :show-clear="showClear"
      option-label="label"
      option-value="value"
      fluid
    />
  </div>
</template>
<style scoped>
.input-select {
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}
</style>