<script setup>
import { TooltipBase } from "../tooltip-base";
import { isDragConfiguration, normalizeDragConfiguration } from "./drag-configuration";
import { useDrag } from "./drag-use";

const props = defineProps({
  draggable: {
    default: false,
    type: [Boolean, Object],
    validator: isDragConfiguration,
  },
  item: {
    default: () => ({}),
    type: Object,
  },
});
const emit = defineEmits(["drag", "drag-start", "drag-end"]);

const { classes, handlers } = useDrag({
  draggable: normalizeDragConfiguration(props.draggable),
  emit,
  value: props.item.value,
});
</script>
<template>
  <div
    v-bind="$attrs"
    :id="item.value"
    class="list-item"
    :class="classes"
    :draggable="!!draggable"
    @dragstart="handlers.start"
    @dragenter="handlers.enter"
    @dragleave="handlers.leave"
    @dragover="handlers.over"
    @drop="handlers.drop"
    @dragend="handlers.end"
  >
    <slot
      name="item"
      v-bind="item"
    />
  </div>
  <tooltip-base
    v-if="item.tooltip"
    :anchor="item.value"
    :text="item.tooltip"
  />
</template>
<style scoped>
.list-item {
  --list-item-drag-border-color: var(--color-surface-70);
}

.list-item {
  flex-grow: 1;
  border: var(--size-05) solid transparent;
  padding-block: var(--size-15);
  padding-inline: var(--size-10);
}

.list-item:hover,
.list-item:focus-within,
.list-item.over {
  background-color: var(--color-surface-30);
}

.list-item.over.top {
  border-top-color: var(--list-item-drag-border-color);
}

.list-item.over.middle {
  border-color: var(--list-item-drag-border-color);
}

.list-item.over.bottom {
  border-bottom-color: var(--list-item-drag-border-color);
}
</style>
