<script setup lang="ts">
import type { OutlineItemData } from "./outline-item-data";

import { useCoreComponent } from "./use-core-component";
import { useDragAndDrop } from "./use-drag-and-drop";

const { item } = defineProps<{
  item: OutlineItemData
}>();

const { handleDragdrop, handleDragover, handleDragstart, moveable } = useDragAndDrop(item);
const coreComponent = useCoreComponent(item);

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
    <component
      :is="coreComponent"
      :item="item"
    />
  </div>
</template>
