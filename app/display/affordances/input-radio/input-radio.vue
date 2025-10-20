<script setup lang="ts">
import SelectButton from "primevue/selectbutton";
import { useId } from "vue";

import { InputLabel } from "@/display/affordances/input-label";
import { kebabCase } from "@/utils";

interface Option {
  label: string;
  value: string;
}

const {
  centered = false,
  disabled = false,
  label,
  stretched = false
} = defineProps<{
  centered?: boolean;
  dataTest: string
  disabled?: boolean
  label: string;
  options: Option[];
  stretched?: boolean;
}>();
const model = defineModel({ type: String });

const id = useId();
</script>
<template>
  <div
    class="input-radio"
    :class="{ centered }"
    :data-test="dataTest"
  >
    <InputLabel
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
      :label="label"
    />
    <SelectButton
      :id="id"
      v-model="model"
      :allow-empty="false"
      :data-test="kebabCase(dataTest, 'input')"
      :disabled="disabled"
      :fluid="stretched"
      option-label="label"
      option-value="value"
      :options="options"
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