<script setup lang="ts">
import { MonthViewer } from "@/utils";

defineEmits<{
  "selected": [id: Node | undefined]
}>();

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

function handleUpdateSelected(date: Date) {
  console.log({ date });
}

function handleUpdateViewed(data: { month: number, year: number }) {
  console.log({ data });
}
</script>
<template>
  <div class="panel-calendar">
    <MonthViewer
      borderless
      :highlights="[today, yesterday]"
      @update:selected="handleUpdateSelected"
      @update:viewed="handleUpdateViewed"
    />
    <div>day schedule</div>
  </div>
</template>
<style scoped>
.panel-calendar {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
}
</style>
