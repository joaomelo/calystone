<script setup lang="ts">
import { computed } from "vue";

import type {
  ReferenceValue,
  TodoArtifact,
  UnitValue
} from "@/domain";

import { useI18n, } from "@/display/affordances/i18n";
import { InputNumber, } from "@/display/affordances/input-number";
import { InputRadio, } from "@/display/affordances/input-radio";
import { Store } from "@/display/store";
import {
  Reference,
  Step,
  Unit
} from "@/domain";
import { throwCritical } from "@/utils";

const { artifact } = defineProps<{ artifact: TodoArtifact; }>();

const { services } = Store.use();
const { t } = useI18n();

const referenceOptions: {
  label: string;
  value: "disabled" | ReferenceValue
}[] = [
  {
    label: t("common.disabled"),
    value: "disabled"
  },
  {
    label: t("editor-todo.dates.completion"),
    value: "completion"
  },
  {
    label: t("editor-todo.dates.due"),
    value: "due"
  },
] as const;

const referenceValue = computed(() => {
  const value = artifact.reference;
  if (!value) return "disabled";
  return value;
});

const unitOptions: {
  label: string;
  value: UnitValue
}[] = [
  {
    label: t("editor-todo.dates.days"),
    value: "days"
  },
  {
    label: t("editor-todo.dates.weeks"),
    value: "weeks"
  },
  {
    label: t("editor-todo.dates.months"),
    value: "months"
  },
  {
    label: t("editor-todo.dates.years"),
    value: "years"
  },
] as const;

async function handleUpdateReference(reference: string | undefined) {
  if (reference === "disabled") {
    artifact.clearRecurrence();
  } else if (Reference.isValue(reference)) {
    artifact.updateReference(reference);
  } else {
    throwCritical("INVALID_REFERENCE");
  }
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateStep(step: number | undefined) {
  if (Step.isValue(step)) {
    artifact.updateStep(step);
  } else {
    throwCritical("INVALID_STEP");
  }
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateUnit(unit: string | undefined) {
  if (Unit.isValue(unit)) {
    artifact.updateUnit(unit);
  } else {
    throwCritical("INVALID_UNIT");
  }
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <InputRadio
    data-test="input-reference"
    :disabled="!artifact.hasDates"
    :label="t('editor-todo.dates.recurring-by')"
    :model-value="referenceValue"
    :options="referenceOptions"
    @update:model-value="handleUpdateReference"
  />
  <div class="control-dates__step-unit">
    <InputNumber
      buttons
      data-test="input-step"
      :disabled="!artifact.hasDates"
      :label="t('editor-todo.dates.step')"
      :model-value="artifact.step"
      @update:model-value="handleUpdateStep"
    />
    <InputRadio
      data-test="input-unit"
      :disabled="!artifact.hasDates"
      :label="t('editor-todo.dates.unit')"
      :model-value="artifact.unit"
      :options="unitOptions"
      @update:model-value="handleUpdateUnit"
    />
  </div>
</template>
<style scoped>
.control-dates__step-unit {
  display: flex;
  gap: var(--size-3);
}
</style>
