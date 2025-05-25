<script lang="ts" setup>
import { Store } from "@/display/store";
import { formatDateTime, throwCritical } from "@/utils";
import { computed } from "vue";
import { ref } from "vue";

const { date } = defineProps<{
  date: Date
}>();
const emit = defineEmits<{
  "selected": [id?: string]
}>();

const { services } = Store.use();
const selected = ref<string | undefined>(undefined);

const items = computed(() => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  const todos = services.trackTodos.todosWithin({ end, start });

  const items = todos.map(todo => {
    const dateStart = todo.dateStart();
    const dateDue = todo.dateDue();
    if (!dateStart || !dateDue) throwCritical("TODO_MUST_HAVE_DATES");

    const id = todo.id;
    const name = todo.basename();
    const start = formatDateTime(dateStart);
    const end = formatDateTime(dateDue);
    const progress = todo.progress();
    const completed = todo.completed();
    return { completed, end, id, name, progress, start };
  });

  return items.sort((a, b) => a.start.localeCompare(b.start));
});

function handleClick(id: string) {
  const newSelected = selected.value === id ? undefined : id;
  selected.value = newSelected;
  emit("selected", newSelected);
}
</script>
<template>
  <ul class="timeline-viewer">
    <li
      v-for="item in items"
      :key="item.id"
      class="timeline-viewer__item"
      data-test="timeline-viewer__item"
      :class="{ selected: selected === item.id }"
      @click="handleClick(item.id)"
    >
      <div class="timeline-viewer__item-header">
        {{ item.start }} - {{ item.end }} ({{ item.progress }})
      </div>
      <p
        class="timeline-viewer__item-name"
        :class="{ completed: item.completed }"
      >
        {{ item.name }}
      </p>
    </li>
  </ul>
</template>
<style scoped>
.timeline-viewer {
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  padding: var(--size-3);
}

.timeline-viewer__item {
  display: flex;
  flex-direction: column;
  gap: var(--size-1);
  background-color: var(--p-surface-50);
  border-radius: var(--radius-2);
  padding: var(--size-2);
  cursor: pointer;

  &:hover {
    background-color: var(--p-surface-100);
  }

  &.selected {
    background-color: var(--p-highlight-background);
    color: var(--p-highlight-color);
  }
}

.timeline-viewer__item-header {
  font-size: var(--font-size-0);
}

.timeline-viewer__item-name {
  font-weight: var(--font-weight-6);

  &.completed {
    text-decoration: line-through;
  }
}
</style>