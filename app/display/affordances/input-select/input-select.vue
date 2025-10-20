<script setup lang="ts">
import SelectPrimeVue from "primevue/select";
import { useId } from "vue";

import { InputLabel } from "@/display/affordances/input-label";
import { kebabCase } from "@/utils";

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
    class="input-select"
    :data-test="dataTest"
  >
    <InputLabel
      v-if="label"
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
      :label="label"
    />
    <SelectPrimeVue
      :id="id"
      v-model="model"
      data-key="value"
      :data-test="kebabCase(dataTest, 'input')"
      :disabled="disabled"
      fluid
      option-label="label"
      option-value="value"
      :options="options"
      :pt:list:data-test="kebabCase(dataTest, 'options')"
      :show-clear="showClear"
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