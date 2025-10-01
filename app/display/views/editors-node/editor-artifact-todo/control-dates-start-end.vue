<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import {
  InputCheck,
  InputDate,
  useI18n
} from "@/utils";
import { ref } from "vue";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();
const { t } = useI18n();

const allDay = ref(artifact.allDay);

async function handleUpdateAllDay(value: boolean) {
  allDay.value = value;
  if (value) {
    artifact.makeAllDay();
  }
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateEnd(date: Date | null | undefined) {
  if (date) {
    artifact.updateEnd({
      allDay: allDay.value,
      date
    });
  } else {
    artifact.clearDates();
  }
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateStart(date: Date | null | undefined) {
  if (date) {
    artifact.updateStart({
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
    data-test="input-all-day"
    :label="t('editor-todo.dates.allDay')"
    :model-value="allDay"
    @update:model-value="handleUpdateAllDay"
  />
  <div class="control-dates-start-end">
    <InputDate
      data-test="input-start"
      default-time="0:0"
      :label="t('editor-todo.dates.start')"
      :model-value="artifact.start"
      :show-time="!allDay"
      @update:model-value="handleUpdateStart"
    />
    <InputDate
      data-test="input-end"
      default-time="23:59"
      :label="t('editor-todo.dates.end')"
      :model-value="artifact.end"
      :show-time="!allDay"
      @update:model-value="handleUpdateEnd"
    />
  </div>
</template>
<style scoped>
.control-dates-start-end {
  display: flex;
  gap: var(--size-3);

  & > * {
    flex: 1;
  }
}
</style>
