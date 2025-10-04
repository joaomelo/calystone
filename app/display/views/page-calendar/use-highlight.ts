import {
  computed,
  ref
} from "vue";

import { Store } from "@/display/store";

interface Month {
  month: number,
  year: number
}

export function useHighlight() {
  const { services } = Store.use();
  const todos = services.spawnCollections.todos();

  const today = new Date();
  const viewedMonth = ref<Month>({
    month: today.getMonth(),
    year: today.getFullYear()
  });

  const highlightedDays = computed(() => {
    const {
      month,
      year
    } = viewedMonth.value;

    const start = new Date(year, month, 1, 0, 0, 0, 0);
    const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
    const datesWithTodos = todos.datesWithUncompleted({
      end,
      start
    });
    return datesWithTodos;
  });

  return {
    highlightedDays,
    viewedMonth
  };
}