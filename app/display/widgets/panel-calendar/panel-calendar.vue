<script setup lang="ts">
import { Store } from "@/display/store";
import { MonthViewer } from "@/utils";
import { computed, ref } from "vue";

interface Month { month: number, year: number }

defineEmits<{
  "selected": [id: Node | undefined]
}>();

const { services } = Store.use();

const today = new Date();
const selected = ref<Date>(today);
const viewed = ref<Month>({ month: today.getMonth(), year: today.getFullYear() });

const highlights = computed(() => {
  const { month, year } = viewed.value;

  const start = new Date(year, month, 1, 0, 0, 0, 0);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  const datesWithTodos = services.trackTodos.computeDatesWithTodos({ end, start });
  console.log({ datesWithTodos });
  return datesWithTodos;
});

function handleUpdateSelected(date: Date) {
  selected.value = date;
}

function handleUpdateViewed(data: Month) {
  viewed.value = data;
}
</script>
<template>
  <div class="panel-calendar">
    <MonthViewer
      borderless
      :highlights="highlights"
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
