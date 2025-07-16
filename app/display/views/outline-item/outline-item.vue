<script setup lang="ts">
import type { ItemData } from "./item";

import { useCore } from "./use-core";
import { useDragAndDrop } from "./use-drag-and-drop";

const { data } = defineProps<{ data: ItemData }>();

const {
  handleDragdrop, handleDragover, handleDragstart, moveable
} = useDragAndDrop(data);
const coreComponent = useCore(data);

</script>
<template>
  <div
    :draggable="moveable.isOk()"
    data-test-type="outline-item"
    :data-test="data.key"
    class="outline-item"
    @dragstart="handleDragstart"
    @drop="handleDragdrop"
    @dragover="handleDragover"
    @dragenter="handleDragover"
  >
    <component :is="coreComponent" />
  </div>
</template>
