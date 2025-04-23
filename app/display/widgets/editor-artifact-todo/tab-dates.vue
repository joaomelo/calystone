<script setup lang="ts">
import type { TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { FieldSet, InputCheck, InputDate, useI18n } from "@/utils";
import { ref } from "vue";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

const allDay = ref(true);

async function handleUpdateDueDate(due: Date | null | undefined) {
  artifact.updateDueDate({ anchor: allDay.value, date: due ?? null });
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateStartDate(start: Date | null | undefined) {
  artifact.updateStartDate({ anchor: allDay.value, date: start ?? null });
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <FieldSet :legend="t('dates.dates')">
    <div class="dates-panel__inputs">
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
      <InputCheck
        v-model="allDay"
        :label="t('dates.allDay')"
        data-test="input-all-day"
      />
    </div>
  </FieldSet>
</template>
<style scoped>
.dates-panel__inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--size-3);
}
</style>
