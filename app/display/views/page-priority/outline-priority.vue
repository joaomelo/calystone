<script setup lang="ts">
import type { Lenses } from "@/display/views/lenses-todos";
import type { ItemData } from "@/display/views/outline-item";

import { useTodos } from "@/display/views/lenses-todos";
import { OutlineItems } from "@/display/views/outline-items";

const { lenses } = defineProps<{ lenses: Lenses }>();
const emit = defineEmits<{ "selected": [node: ItemData | undefined] }>();

const items = useTodos(lenses);

function handleSelected(data?: ItemData) {
  if (!data) {
    emit("selected", undefined);
    return;
  };

  emit("selected", data);
}
</script>
<template>
  <OutlineItems
    data-test="outline-priority"
    :items="items"
    mode="list"
    @selected="handleSelected"
  />
</template>
