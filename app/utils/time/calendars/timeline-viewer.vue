<script lang="ts" setup>
import { formatDateTime } from "@/utils/time/format";
import TimelinePrimeVue from "primevue/timeline";
import { computed } from "vue";

interface Event { start: Date; end: Date; text: string }

const props = defineProps<{
  events: Event[]
}>();

const items = computed(() => {
  const items = props.events.map(event => {
    const start = formatDateTime(event.start);
    const end = formatDateTime(event.end);
    const content = event.text;
    return { content, end, start };
  });
  return items.sort((a, b) => a.start.localeCompare(b.start));
});
</script>
<template>
  <TimelinePrimeVue
    :value="items"
    align="left"
    class="timeline-viewer"
  >
    <template #opposite="slotProps">
      <div class="timeline-viewer__start-end">
        <small>{{ slotProps.item.start }}</small>
        <small>{{ slotProps.item.end }}</small>
      </div>
    </template>
    <template #content="slotProps">
      <small>{{ slotProps.item.content }}</small>
    </template>
  </TimelinePrimeVue>
</template>
<style scoped>
.timeline-viewer :deep(.p-timeline-event) {
  min-height: var(--size-8);
}

.timeline-viewer :deep(.p-timeline-event-opposite) {
  flex: revert;
}

.timeline-viewer__start-end {
  display: flex;
  flex-direction: column;
}
</style>