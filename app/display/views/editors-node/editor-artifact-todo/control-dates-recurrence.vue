<script setup lang="ts">
import type {
  ReferenceValue,
  TodoArtifact,
  UnitValue
} from "@/domain";

import { Store } from "@/display/store";
import {
  Reference,
  Step,
  Unit
} from "@/domain";
import {
  InputNumber,
  InputRadio,
  throwCritical,
  useI18n
} from "@/utils";
import { computed } from "vue";

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
  const value = artifact.scheduler.reference;
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
    artifact.scheduler.clearRecurrence();
  } else if (Reference.isValue(reference)) {
    artifact.scheduler.updateReference(reference);
  } else {
    throwCritical("INVALID_REFERENCE");
  }
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateStep(step: number | undefined) {
  if (Step.isValue(step)) {
    artifact.scheduler.updateStep(step);
  } else {
    throwCritical("INVALID_STEP");
  }
  await services.exchangeArtifact.postFrom(artifact);
}

async function handleUpdateUnit(unit: string | undefined) {
  if (Unit.isValue(unit)) {
    artifact.scheduler.updateUnit(unit);
  } else {
    throwCritical("INVALID_UNIT");
  }
  await services.exchangeArtifact.postFrom(artifact);
}
</script>
<template>
  <InputRadio
    :label="t('editor-todo.dates.recurring-by')"
    data-test="input-reference"
    :model-value="referenceValue"
    :options="referenceOptions"
    :disabled="!artifact.scheduler.hasDates"
    @update:model-value="handleUpdateReference"
  />
  <div class="control-dates__step-unit">
    <InputNumber
      :label="t('editor-todo.dates.step')"
      data-test="input-step"
      buttons
      :disabled="!artifact.scheduler.hasDates"
      :model-value="artifact.scheduler.step"
      @update:model-value="handleUpdateStep"
    />
    <InputRadio
      :label="t('editor-todo.dates.unit')"
      data-test="input-unit"
      :options="unitOptions"
      :disabled="!artifact.scheduler.hasDates"
      :model-value="artifact.scheduler.unit"
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
