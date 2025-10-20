<script setup lang="ts">
import { ref } from "vue";

import type { OutlineGridKeys } from "@/display/affordances/outline-grid";

import { MonthViewer } from "@/display/affordances/month-viewer";
import { OutlineNodes } from "@/display/views/outline-nodes";
import { OutlineTodo } from "@/display/views/outlines-node";

import { useHighlight } from "./use-highlight";
import { useItems } from "./use-items";

interface Month {
  month: number,
  year: number
}

const selectedKeys = defineModel<OutlineGridKeys>("selectedKeys", { default: () => ({}) });

const {
  highlightedDays,
  viewedMonth
} = useHighlight();

const selectedDate = ref<Date>(new Date());
const items = useItems(selectedDate);

function handleUpdateDateSelected(date: Date) {
  selectedDate.value = date;
}

function handleUpdateMonthViewed(data: Month) {
  viewedMonth.value = data;
}
</script>
<template>
  <div class="outline-calendar">
    <MonthViewer
      borderless
      class="outline-calendar__month-viewer"
      :highlights="highlightedDays"
      @update:selected="handleUpdateDateSelected"
      @update:viewed="handleUpdateMonthViewed"
    />
    <OutlineNodes
      v-model:selected-keys="selectedKeys"
      data-test="outline-calendar-nodes"
      display-mode="list"
      :items="items"
    >
      <template #default="{ node }">
        <OutlineTodo :todo="node" />
      </template>
    </OutlineNodes>
  </div>
</template>
<style scoped>
.outline-calendar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.outline-calendar__month-viewer :deep(.p-datepicker-panel) {
  padding: 0;
}
</style>
