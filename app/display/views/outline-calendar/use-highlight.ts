import { Store } from "@/display/store";
import { computed, ref } from "vue";

interface Month { month: number, year: number }

export function useHighlight() {
  const { services } = Store.use();

  const today = new Date();
  const viewedMonth = ref<Month>({ month: today.getMonth(), year: today.getFullYear() });

  const highlightedDays = computed(() => {
    const { month, year } = viewedMonth.value;

    const start = new Date(year, month, 1, 0, 0, 0, 0);
    const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
    const datesWithTodos = services.trackTodos.datesWithTodosWithin({ end, start });
    return datesWithTodos;
  });

  return { highlightedDays, viewedMonth };
}