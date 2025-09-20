<script setup lang="ts">
import { isArrayFull } from "@/utils/arrays";
import { kebabCase } from "@/utils/text";
import InputTextPrimeVue from "primevue/inputtext";
import {
  computed,
  useId
} from "vue";

import { InputError } from "../input-error";
import { InputLabel } from "../input-label";

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
    :data-test="dataTest"
    class="input-text"
  >
    <InputLabel
      v-if="label"
      :label="label"
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
    />
    <InputTextPrimeVue
      :id="id"
      v-model="model"
      :invalid="!!error"
      :data-test="kebabCase(dataTest, 'input')"
      fluid
      :autofocus="autofocus"
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
      :message="error"
      :data-test="kebabCase(dataTest, 'error')"
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