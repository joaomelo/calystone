<script setup lang="ts">
import InputCheckboxPrimeVue from "primevue/checkbox";
import { useId } from "vue";

import { kebabCase } from "@/utils/text";

import { InputLabel } from "../input-label";

defineProps<{
  dataTest: string
  label: string;
}>();
const model = defineModel<boolean>({ required: true });
const id = useId();
</script>
<template>
  <div
    class="input-check"
    :data-test="dataTest"
    direction="row-reverse"
  >
    <InputCheckboxPrimeVue
      v-model="model"
      binary
      :data-test="kebabCase(dataTest, 'input')"
      :input-id="id"
      variant="filled"
    />
    <InputLabel
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
      :label="label"
    />
  </div>
</template>
<style scoped>
.input-check {
  display: flex;
  flex-direction: row;
  gap: var(--size-2);
}
</style>