<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { InputCheck, InputDate, useI18n } from "@/utils";
import { ref } from "vue";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

const allDay = ref(true);

async function handleUpdateDueDate(due: Date | null | undefined) {
  artifact.scheduler.updateDue({ anchor: allDay.value, date: due ?? undefined });
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateStartDate(start: Date | null | undefined) {
  artifact.scheduler.updateStart({ anchor: allDay.value, date: start ?? undefined });
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <div class="control-dates">
    <InputCheck
      v-model="allDay"
      :label="t('editor-todo.dates.allDay')"
      data-test="input-all-day"
    />
    <InputDate
      :label="t('editor-todo.dates.start')"
      data-test="input-start"
      :model-value="artifact.scheduler.start"
      default-time="0:0"
      :show-time="!allDay"
      @update:model-value="handleUpdateStartDate"
    />
    <InputDate
      :label="t('editor-todo.dates.due')"
      data-test="input-due"
      :model-value="artifact.scheduler.due"
      default-time="23:59"
      :show-time="!allDay"
      @update:model-value="handleUpdateDueDate"
    />
  </div>
</template>
<style scoped>
.control-dates {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
