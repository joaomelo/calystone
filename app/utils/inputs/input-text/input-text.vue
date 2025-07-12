<script setup lang="ts">
import { hasElements } from "@/utils/arrays";
import { kebabCase } from "@/utils/text";
import InputTextPrimeVue from "primevue/inputtext";
import { computed } from "vue";

import { InputWrapper } from "../input-wrapper";

const { suggestions = [] } = defineProps<{
  autofocus?: boolean
  dataTest: string
  readonly?: boolean;
  suggestions?: string[]
}>();
const model = defineModel<string>();

const hasSuggestions = computed(() => hasElements(suggestions));

const formDatalistName = (baseId: string) => kebabCase(baseId, "suggestions");
</script>
<template>
  <InputWrapper :data-test="dataTest">
    <template #default="{ id, invalid, inputDataTest }">
      <InputTextPrimeVue
        :id="id"
        v-model="model"
        :invalid="invalid"
        :data-test="inputDataTest"
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
    </template>
  </InputWrapper>
</template>
