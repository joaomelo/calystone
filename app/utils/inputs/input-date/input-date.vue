<script setup lang="ts">
import { kebabCase } from "@/utils/text";
import InputDatePrimeVue from "primevue/datepicker";
import {
  onMounted,
  useId,
  useTemplateRef
} from "vue";

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
    :data-test="dataTest"
    class="input-date"
  >
    <InputLabel
      :label="label"
      :data-test="kebabCase(dataTest, 'label')"
      :for-id="id"
    />
    <InputDatePrimeVue
      ref="input"
      v-model="model"
      :input-id="id"
      :disabled="disabled"
      :data-test="kebabCase(dataTest, 'input')"
      fluid
      show-icon
      select-other-months
      show-button-bar
      :show-time="showTime"
      hide-on-date-time-select
      date-format="yy-mm-dd"
      :show-on-focus="false"
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