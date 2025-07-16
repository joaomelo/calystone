<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import {
  InputCheck, InputDate, useI18n
} from "@/utils";
import { ref } from "vue";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();
const { t } = useI18n();

const allDay = ref(artifact.allDay());

async function handleUpdateDueDate(date: Date | null | undefined) {
  if (date) {
    artifact.updateDateDue({
      allDay: allDay.value,
      date
    });
  } else {
    artifact.clearDates();
  }
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateStartDate(date: Date | null | undefined) {
  if (date) {
    artifact.updateDateStart({
      allDay: allDay.value,
      date
    });
  } else {
    artifact.clearDates();
  }
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <InputCheck
    v-model="allDay"
    :label="t('editor-todo.dates.allDay')"
    data-test="input-all-day"
  />
  <div class="control-dates-start-due">
    <InputDate
      :label="t('editor-todo.dates.start')"
      data-test="input-start"
      :model-value="artifact.dateStart()"
      default-time="0:0"
      :show-time="!allDay"
      @update:model-value="handleUpdateStartDate"
    />
    <InputDate
      :label="t('editor-todo.dates.due')"
      data-test="input-due"
      :model-value="artifact.dateDue()"
      default-time="23:59"
      :show-time="!allDay"
      @update:model-value="handleUpdateDueDate"
    />
  </div>
</template>
<style scoped>
.control-dates-start-due {
  display: flex;
  gap: var(--size-3);
}
</style>
