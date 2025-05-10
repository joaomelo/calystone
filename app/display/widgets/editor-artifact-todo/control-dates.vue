<script setup lang="ts">
import type { RecurrenceReferenceValue, RecurrenceUnitValue, TodoArtifact } from "@/domain";

import { Store } from "@/display/store";
import { ButtonBase, InputCheck, InputDate, InputNumber, InputSelectButton, throwCritical, useI18n } from "@/utils";
import { computed, ref } from "vue";

const { artifact } = defineProps<{
  artifact: TodoArtifact;
}>();

const { services } = Store.use();
const { t } = useI18n();

const allDay = ref(true);

const referenceOptions: { label: string; value: "disabled" | RecurrenceReferenceValue }[] = [
  { label: t("common.disabled"), value: "disabled" },
  { label: t("editor-todo.dates.completion"), value: "completion" },
  { label: t("editor-todo.dates.due"), value: "due" },
] as const;

const referenceValue = computed(() => {
  const value = artifact.reference();
  if (!value) return "disabled";
  return value;
});

const unitOptions: { label: string; value: RecurrenceUnitValue }[] = [
  { label: t("editor-todo.dates.days"), value: "days" },
  { label: t("editor-todo.dates.weeks"), value: "weeks" },
  { label: t("editor-todo.dates.months"), value: "months" },
  { label: t("editor-todo.dates.years"), value: "years" },
] as const;

async function handleClearDates() {
  artifact.clearDates();
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateDueDate(date: Date | null | undefined) {
  if (date) {
    artifact.updateDateDue({ allDay: allDay.value, date });
  } else {
    artifact.clearDates();
  }
  await services.exchangeArtifact.postFrom(artifact);
}

function handleUpdateReference(reference: string | undefined) {
  if (!reference) throwCritical("INVALID_REFERENCE");
  console.log(reference);
}

async function handleUpdateStartDate(date: Date | null | undefined) {
  if (date) {
    artifact.updateDateStart({ allDay: allDay.value, date });
  } else {
    artifact.clearDates();
  }
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
    <InputSelectButton
      :label="t('editor-todo.dates.recurring-by')"
      data-test="input-reference"
      :model-value="referenceValue"
      :options="referenceOptions"
      @update:model-value="handleUpdateReference"
    />
    <div class="control-dates__step-unit">
      <InputNumber
        :label="t('editor-todo.dates.step')"
        data-test="input-step"
        buttons
      />
      <InputSelectButton
        :label="t('editor-todo.dates.unit')"
        data-test="input-unit"
        :options="unitOptions"
      />
    </div>
    <ButtonBase
      :label="t('editor-todo.dates.clear')"
      data-test="button-clear"
      icon="bx bx-trash"
      severity="secondary"
      @click="handleClearDates"
    />
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
