<script setup lang="ts">
import InputDatePrimeVue from "primevue/datepicker";
import {
  onMounted,
  useId,
  useTemplateRef
} from "vue";

import { kebabCase } from "@/utils/text";

import { InputLabel } from "../input-label";

const {
  defaultTime = undefined,
  disabled = false,
  showTime = false
} = defineProps<{
  dataTest: string
  defaultTime?: string
  disabled?: boolean
  label: string
  showTime?: boolean
}>();
const model = defineModel<Date | null>();

const id = useId();

const input = useTemplateRef("input");
onMounted(() => {
  if (input.value && showTime && defaultTime) {
    const [hours, minutes] = defaultTime.split(":").map(Number);
    (input.value as unknown as { currentHour: number }).currentHour = hours;
    (input.value as unknown as { currentMinute: number }).currentMinute = minutes;
  }
});
</script>
<template>
  <div
    class="input-date"
    :data-test="dataTest"
  >
    <InputLabel
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
      :label="label"
    />
    <InputDatePrimeVue
      ref="input"
      v-model="model"
      :data-test="kebabCase(dataTest, 'input')"
      date-format="yy-mm-dd"
      :disabled="disabled"
      fluid
      hide-on-date-time-select
      :input-id="id"
      select-other-months
      show-button-bar
      show-icon
      :show-on-focus="false"
      :show-time="showTime"
    />
  </div>
</template>
<style scoped>
.input-date {
  display: flex;
  flex-direction: column;
  gap: var(--size-2);
}
</style>