<script setup lang="ts">
import { kebabCase } from "@/utils/text";
import InputCheckboxPrimeVue from "primevue/checkbox";
import { useId } from "vue";

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
    :data-test="dataTest"
    direction="row-reverse"
    class="input-check"
  >
    <InputCheckboxPrimeVue
      v-model="model"
      :input-id="id"
      binary
      variant="filled"
      :data-test="kebabCase(dataTest, 'input')"
    />
    <InputLabel
      :label="label"
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
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