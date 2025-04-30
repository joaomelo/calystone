<script setup lang="ts">
import type { OutlineItemData } from "./outline-item-data";

import { useAppearance } from "./use-appearance";
import { useDragAndDrop } from "./use-drag-and-drop";

const { item } = defineProps<{
  item: OutlineItemData
}>();

const { handleDragdrop, handleDragover, handleDragstart, moveable } = useDragAndDrop(item);
const appearance = useAppearance(item);

</script>
<template>
  <div
    :draggable="moveable.isOk()"
    data-test-type="outline-item"
    :data-test="item.key"
    :style="appearance.style"
    class="outline-item"
    @dragstart="handleDragstart"
    @drop="handleDragdrop"
    @dragover="handleDragover"
    @dragenter="handleDragover"
  >
    <i :class="appearance.icon" />
    <p>{{ appearance.label }}</p>
  </div>
</template>
<style scoped>
.outline-item {
  display: flex;
  gap: var(--size-1)
}
</style>