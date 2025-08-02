<script setup lang="ts">
import type {
  DatePickerDateSlotOptions,
  DatePickerMonthChangeEvent
} from "primevue/datepicker";

import DatePicker from "primevue/datepicker";

const {
  borderless = false, highlights = []
} = defineProps<{
  borderless?: boolean,
  highlights?: Date[]
}>();
const emit = defineEmits<{
  "update:selected": [date: Date]
  "update:viewed": [data: DatePickerMonthChangeEvent]
}>();

function handleUpdateSelected(selected: unknown) {
  const normalizedSelected = selected instanceof Date ? selected : new Date();
  emit("update:selected", normalizedSelected);
}

function handleUpdateViewed(data: DatePickerMonthChangeEvent) {
  const {
    month, year
  } = data;
  const monthIndex = month - 1;
  emit("update:viewed", {
    month: monthIndex,
    year
  });
}

function shouldHighlight(viewerDate: DatePickerDateSlotOptions): boolean {
  return highlights.some(highlightedDate => {
    const hasSameYear = highlightedDate.getFullYear() === viewerDate.year;
    if (!hasSameYear) return false;

    const hasSameMonth = highlightedDate.getMonth() === viewerDate.month;
    if (!hasSameMonth) return false;

    const hasSameDay = highlightedDate.getDate() === viewerDate.day;
    return hasSameDay;
  });
}
</script>
<template>
  <DatePicker
    inline
    :show-other-months="false"
    fluid
    :class="{ borderless }"
    class="month-viewer"
    @month-change="handleUpdateViewed"
    @update:model-value="handleUpdateSelected"
  >
    <template #date="{ date }">
      <div
        class="month-viewer__date"
        :data-test-highlighted="shouldHighlight(date)"
      >
        <span
          v-if="shouldHighlight(date)"
          class="month-viewer__date__highlight"
        />
        <span>{{ date.day }}</span>
      </div>
    </template>
  </DatePicker>
</template>
<style scoped>
.borderless :deep(.p-datepicker-panel) {
  border: none;
}

.month-viewer :deep(.p-datepicker-day) {
  overflow: revert;
}

.month-viewer__date {
  position: relative;
  display: inline-block;
}

.month-viewer__date__highlight {
  --size: 6px;
  position: absolute;
  top: calc(var(--size) * -1);
  left: 50%;
  transform: translateX(-50%);
  width: var(--size);
  height: var(--size);
  background-color: var(--p-red-400);
  border-radius: 50%;
  display: block;
}
</style>
