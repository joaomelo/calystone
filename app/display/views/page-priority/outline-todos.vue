<script setup lang="ts">
import type { ItemData } from "@/display/views/outline-item";

import { OutlineItems } from "@/display/views/outline-items";

import type { Filters } from "./filters";

import { useItems } from "./use-todos";

const { filters } = defineProps<{ filters: Filters }>();
const emit = defineEmits<{ "selected": [node: ItemData | undefined] }>();

const items = useItems(filters);

function handleSelected(data?: ItemData) {
  if (!data) {
    emit("selected", undefined);
    return;
  };

  emit("selected", data);
}
</script>
<template>
  <div class="outline-calendar">
    <OutlineItems
      data-test="outline-calendar__items"
      :items="items"
      mode="list"
      @selected="handleSelected"
    />
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
