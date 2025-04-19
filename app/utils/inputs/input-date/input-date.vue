<script setup lang="ts">
import InputDatePrimeVue from "primevue/datepicker";

import { InputWrapper } from "../input-wrapper";

const { autofocus = false, showTime = false } = defineProps<{
  autofocus?: boolean
  dataTest: string
  showTime?: boolean
}>();
const model = defineModel<Date | null>();
</script>
<template>
  <InputWrapper :data-test="dataTest">
    <template #default="{ id, invalid, inputDataTest }">
      <InputDatePrimeVue
        v-model="model"
        :input-id="id"
        class="input-date"
        :autofocus="autofocus"
        :invalid="invalid"
        :data-test="inputDataTest"
        fluid
        show-icon
        select-other-months
        show-button-bar
        :show-time="showTime"
        hide-on-date-time-select
      />
    </template>
  </InputWrapper>
</template>
