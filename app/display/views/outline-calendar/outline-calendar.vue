<script setup lang="ts">
import type { ItemData } from "@/display/views/outline-item";
import type { Node } from "@/domain";

import { Store } from "@/display/store";
import { OutlineItems } from "@/display/views/outline-items";
import { MonthViewer, ScrollPanel } from "@/utils";
import { ref } from "vue";

import { useHighlight } from "./use-highlight";
import { useItems } from "./use-items";

interface Month { month: number, year: number }

const emit = defineEmits<{
  "selected": [node: Node | undefined]
}>();

const { services } = Store.use();

const { highlightedDays, viewedMonth } = useHighlight();

const selectedDate = ref<Date>(new Date());
const items = useItems(selectedDate);

function handleSelected(data?: ItemData) {
  if (!data) {
    emit("selected", undefined);
    return;
  };

  const node = services.retrieveNodes.get(data.key);
  emit("selected", node);
}

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
    <ScrollPanel>
      <OutlineItems
        data-test="outline-calendar__items"
        :items="items"
        mode="list"
        @selected="handleSelected"
      />
    </ScrollPanel>
  </div>
</template>
<style scoped>
.outline-calendar {
  display: flex;
  flex-direction: column;
}

.outline-calendar__month-viewer :deep(.p-datepicker-panel) {
  padding: 0;
}
</style>
