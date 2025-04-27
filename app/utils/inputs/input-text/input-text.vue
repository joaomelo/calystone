<script setup lang="ts">
import type { AutoCompleteOptionSelectEvent } from "primevue/autocomplete";

import { hasElements } from "@/utils/arrays";
import InputAutoCompletePrimeVue from "primevue/autocomplete";
import InputTextPrimeVue from "primevue/inputtext";
import { computed } from "vue";

import { InputWrapper } from "../input-wrapper";

const { suggestions = [] } = defineProps<{
  autofocus?: boolean
  dataTest: string
  suggestions?: string[]
}>();
const emit = defineEmits<{
  "option-select": [option: string]
}>();
const model = defineModel<string>();

const hasSuggestions = computed(() => hasElements(suggestions));

function handleOptionSelect(event: AutoCompleteOptionSelectEvent) {
  if ("value" in event && typeof event.value === "string") {
    emit("option-select", event.value);
  }
}
</script>
<template>
  <InputWrapper :data-test="dataTest">
    <template #default="{ id, invalid, inputDataTest }">
      <InputAutoCompletePrimeVue
        v-if="hasSuggestions"
        :id="id"
        v-model="model"
        :invalid="invalid"
        :data-test="inputDataTest"
        :suggestions="suggestions"
        fluid
        :autofocus="autofocus"
        dropdown
        @option-select="handleOptionSelect"
      />
      <InputTextPrimeVue
        v-else
        :id="id"
        v-model="model"
        :invalid="invalid"
        :data-test="inputDataTest"
        fluid
        :autofocus="autofocus"
      />
    </template>
  </InputWrapper>
</template>
