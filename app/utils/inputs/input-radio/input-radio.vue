<script setup lang="ts">
import { kebabCase } from "@/utils/text";
import SelectButton from "primevue/selectbutton";
import { useId, } from "vue";

import { InputLabel } from "../input-label";

interface Option {
  label: string;
  value: string;
}

const {
  centered = false,
  disabled = false,
  label
} = defineProps<{
  centered?: boolean;
  dataTest: string
  disabled?: boolean
  label: string;
  options: Option[];
}>();
const model = defineModel({ type: String });

const id = useId();
</script>
<template>
  <div
    :label
    :data-test="dataTest"
    class="input-radio"
    :class="{ centered}"
  >
    <InputLabel
      :label="label"
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
    />
    <SelectButton
      :id="id"
      v-model="model"
      :data-test="kebabCase(dataTest, 'input')"
      :disabled="disabled"
      :options="options"
      :allow-empty="false"
      option-label="label"
      option-value="value"
      fluid
    />
  </div>
</template>
<style scoped>
.input-radio {
  display: flex;
  flex-direction: column;
  gap: var(--size-2);

  &.centered {
    align-items: center;
  }
}
</style>