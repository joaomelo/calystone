<script setup lang="ts">
import InputTextPrimeVue from "primevue/inputtext";
import {
  computed,
  useId
} from "vue";

import { InputError } from "@/display/affordances/input-error";
import { InputLabel } from "@/display/affordances/input-label";
import {
  isArrayFull,
  kebabCase
} from "@/utils";

const { suggestions = [] } = defineProps<{
  autofocus?: boolean
  dataTest: string
  error?: string
  label?: string;
  readonly?: boolean;
  suggestions?: string[]
}>();
const model = defineModel<string>();

const hasSuggestions = computed(() => isArrayFull(suggestions));

const id = useId();
const formDatalistName = (baseId: string) => kebabCase(baseId, "suggestions");
</script>
<template>
  <div
    class="input-text"
    :data-test="dataTest"
  >
    <InputLabel
      v-if="label"
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
      :label="label"
    />
    <InputTextPrimeVue
      :id="id"
      v-model="model"
      :autofocus="autofocus"
      :data-test="kebabCase(dataTest, 'input')"
      fluid
      :invalid="!!error"
      :list="formDatalistName(id)"
      :readonly="readonly"
    />
    <datalist
      v-if="hasSuggestions"
      :id="formDatalistName(id)"
    >
      <option
        v-for="suggestion in suggestions"
        :key="suggestion"
        :value="suggestion"
      />
    </datalist>
    <InputError
      v-if="error"
      :data-test="kebabCase(dataTest, 'error')"
      :message="error"
    />
  </div>
</template>
<style scoped>
.input-radio {
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}
</style>