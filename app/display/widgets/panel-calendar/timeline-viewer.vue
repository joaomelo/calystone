<script lang="ts" setup>
import { Store } from "@/display/store";
import { formatDateTime, throwCritical } from "@/utils";
import { computed } from "vue";

const { date } = defineProps<{
  date: Date
}>();
defineEmits<{
  "selected": [id: string | undefined]
}>();

const { services } = Store.use();

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
</script>
<template>
  <div class="timeline-viewer">
    <div
      v-for="item in items"
      :key="item.id"
      class="timeline-viewer__item"
      @click="$emit('selected', item.id)"
    >
      <div class="timeline-viewer__item-meta">
        {{ item.start }} - {{ item.end }} ({{ item.progress }})
      </div>
      <p
        class="timeline-viewer__item-name"
        :class="{ completed: item.completed }"
      >
        {{ item.name }}
      </p>
    </div>
  </div>
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

  &:hover {
    background-color: var(--p-surface-100);
  }
}

.timeline-viewer__item-meta {
  font-size: var(--font-size-0);
}

.timeline-viewer__item-name {
  font-weight: var(--font-weight-6);

  &.completed {
    text-decoration: line-through;
  }
}
</style>