<script setup lang="ts">
import type { OutlineItemData } from "./outline-item-data";

import { useCore } from "./use-core";
import { useDragAndDrop } from "./use-drag-and-drop";

const { item } = defineProps<{
  item: OutlineItemData
}>();

const { handleDragdrop, handleDragover, handleDragstart, moveable } = useDragAndDrop(item);
const coreComponent = useCore(item);

</script>
<template>
  <div
    :draggable="moveable.isOk()"
    data-test-type="outline-item"
    :data-test="item.key"
    class="outline-item"
    @dragstart="handleDragstart"
    @drop="handleDragdrop"
    @dragover="handleDragover"
    @dragenter="handleDragover"
  >
    <component :is="coreComponent" />
  </div>
</template>
