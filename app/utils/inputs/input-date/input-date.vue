<script setup lang="ts">
import InputDatePrimeVue from "primevue/datepicker";
import { onMounted, useTemplateRef } from "vue";

import { InputWrapper } from "../input-wrapper";

const { defaultTime = undefined, showTime = false } = defineProps<{
  dataTest: string
  defaultTime?: string
  showTime?: boolean
}>();
const model = defineModel<Date | null>();

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
  <InputWrapper :data-test="dataTest">
    <template #default="{ id, invalid, inputDataTest }">
      <InputDatePrimeVue
        ref="input"
        v-model="model"
        :input-id="id"
        class="input-date"
        :invalid="invalid"
        :data-test="inputDataTest"
        fluid
        show-icon
        select-other-months
        show-button-bar
        :show-time="showTime"
        hide-on-date-time-select
        date-format="yy-mm-dd"
      />
    </template>
  </InputWrapper>
</template>
