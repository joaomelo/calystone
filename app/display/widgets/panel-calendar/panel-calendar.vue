<script setup lang="ts">
import { Store } from "@/display/store";
import { MonthViewer } from "@/utils";
import { computed, ref } from "vue";

import TimelineViewer from "./timeline-viewer.vue";

interface Month { month: number, year: number }

const emit = defineEmits<{
  "selected": [id: Node | undefined]
}>();

const { services } = Store.use();

const today = new Date();
const selectedDate = ref<Date>(today);
const viewedMonth = ref<Month>({ month: today.getMonth(), year: today.getFullYear() });

const highlightedDays = computed(() => {
  const { month, year } = viewedMonth.value;

  const start = new Date(year, month, 1, 0, 0, 0, 0);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  const datesWithTodos = services.trackTodos.datesWithTodosWithin({ end, start });
  return datesWithTodos;
});

function handleUpdateDateSelected(date: Date) {
  selectedDate.value = date;
}

function handleUpdateMonthViewed(data: Month) {
  viewedMonth.value = data;
}

function handleUpdateTodoSelected(id?: Node) {
  emit("selected", id);
}
</script>
<template>
  <div class="panel-calendar">
    <MonthViewer
      borderless
      :highlights="highlightedDays"
      @update:selected="handleUpdateDateSelected"
      @update:viewed="handleUpdateMonthViewed"
    />
    <TimelineViewer
      :date="selectedDate"
      @update:selected="handleUpdateTodoSelected"
    />
  </div>
</template>
<style scoped>
.panel-calendar {
  display: flex;
  flex-direction: column;
}
</style>
