<script setup lang="ts">
import type { Reference, TodoArtifact, Unit } from "@/domain";

import { Store } from "@/display/store";
import { InputCheck, InputDate, InputNumber, InputSelectButton, useI18n } from "@/utils";
import { ref } from "vue";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

const allDay = ref(true);
const recurring = ref(false);

const referenceOptions: { label: string; value: Reference }[] = [
  { label: t("common.disabled"), value: "disabled" },
  { label: t("editor-todo.dates.completion"), value: "completion" },
  { label: t("editor-todo.dates.due"), value: "due" },
] as const;

const unitOptions: { label: string; value: Unit }[] = [
  { label: t("editor-todo.dates.days"), value: "days" },
  { label: t("editor-todo.dates.weeks"), value: "weeks" },
  { label: t("editor-todo.dates.months"), value: "months" },
  { label: t("editor-todo.dates.years"), value: "years" },
] as const;

async function handleUpdateDueDate(due: Date | null | undefined) {
  artifact.dater.updateDue({ anchor: allDay.value, date: due ?? undefined });
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateStartDate(start: Date | null | undefined) {
  artifact.dater.updateStart({ anchor: allDay.value, date: start ?? undefined });
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
    <div class="control-dates__start-due">
      <InputDate
        :label="t('editor-todo.dates.start')"
        data-test="input-start"
        :model-value="artifact.dater.start"
        default-time="0:0"
        :show-time="!allDay"
        @update:model-value="handleUpdateStartDate"
      />
      <InputDate
        :label="t('editor-todo.dates.due')"
        data-test="input-due"
        :model-value="artifact.dater.due"
        default-time="23:59"
        :show-time="!allDay"
        @update:model-value="handleUpdateDueDate"
      />
    </div>
    <InputSelectButton
      :label="t('editor-todo.dates.recurring-by')"
      :disabled="!recurring"
      data-test="input-reference"
      :options="referenceOptions"
    />
    <div class="control-dates__step-unit">
      <InputNumber
        :label="t('editor-todo.dates.step')"
        data-test="input-step"
        :disabled="!recurring"
        buttons
      />
      <InputSelectButton
        :label="t('editor-todo.dates.unit')"
        :disabled="!recurring"
        data-test="input-unit"
        :options="unitOptions"
      />
    </div>
  </div>
</template>
<style scoped>
.control-dates {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}

.control-dates__start-due,
.control-dates__step-unit {
  display: flex;
  gap: var(--size-3);
}
</style>
