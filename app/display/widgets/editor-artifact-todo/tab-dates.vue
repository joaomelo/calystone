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
  artifact.updateDueDate({ anchor: allDay.value, date: due ?? undefined });
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateStartDate(start: Date | null | undefined) {
  artifact.updateStartDate({ anchor: allDay.value, date: start ?? undefined });
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <div class="tab-dates">
    <InputCheck
      v-model="allDay"
      :label="t('dates.allDay')"
      data-test="input-all-day"
    />
    <InputDate
      :label="t('dates.start')"
      data-test="input-start"
      :model-value="artifact.startDate()"
      default-time="0:0"
      :show-time="!allDay"
      @update:model-value="handleUpdateStartDate"
    />
    <InputDate
      :label="t('dates.due')"
      data-test="input-due"
      :model-value="artifact.dueDate()"
      default-time="23:59"
      :show-time="!allDay"
      @update:model-value="handleUpdateDueDate"
    />
  </div>
</template>
<style scoped>
.tab-dates {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
