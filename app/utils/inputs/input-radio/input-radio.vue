<script setup lang="ts">
import { kebabCase } from "@/utils/text";
import RadioButton from "primevue/radiobutton";

import { InputWrapper } from "../input-wrapper";

const { direction = "column", disabled = false, label } = defineProps<{
  dataTest: string
  direction?: "column" | "row";
  disabled?: boolean
  label?: string;
  options: { label: string; value: string }[];
}>();
const model = defineModel<string | undefined>();

</script>
<template>
  <InputWrapper
    :label
    :data-test="dataTest"
  >
    <template #default="{ id, inputDataTest }">
      <div
        :id="id"
        :data-test="inputDataTest"
        class="input-select-button__container"
      >
        <div
          v-for="option in options"
          :key="option.value"
          class="input-select-button__option"
        >
          <RadioButton
            v-model="model"
            :input-id="kebabCase(id, option.value)"
            :name="id"
            :value="option.value"
            :disabled="disabled"
          />
          <label :for="kebabCase(id, option.value)">
            {{ option.label }}
          </label>
        </div>
      </div>
    </template>
  </InputWrapper>
</template>
<style scoped>
.input-select-button__container {
  display: flex;
  flex-direction: v-bind(direction);
  gap: var(--size-2);
}

.input-select-button__option {
  display: flex;
  gap: var(--size-1);
}
</style>