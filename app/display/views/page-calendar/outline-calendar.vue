<script setup lang="ts">
import type { OutlineGridKeys } from "@/utils";

import { OutlineItem } from "@/display/views/outline-item";
import { OutlineItems } from "@/display/views/outline-items";
import { MonthViewer } from "@/utils";
import { ref } from "vue";

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
      :highlights="highlightedDays"
      class="outline-calendar__month-viewer"
      @update:selected="handleUpdateDateSelected"
      @update:viewed="handleUpdateMonthViewed"
    />
    <OutlineItems
      v-model:selected-keys="selectedKeys"
      data-test="outline-calendar__items"
      :items="items"
      mode="list"
    >
      <template #default="{ itemData }">
        <OutlineItem :data="itemData" />
      </template>
    </OutlineItems>
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
