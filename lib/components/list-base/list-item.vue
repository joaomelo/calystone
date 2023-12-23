<script setup>
import { useDrag } from "./use-drag";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["drag", "drag-start", "drag-end", "edit"]);

const { handlers, classes } = useDrag({ value: props.item.value, emit });

const handleBlur = (e) => {
  const text = e.target.textContent;
  if (text === props.item.text) return;
  emit("edit", { item: props.item.value, text });
};
</script>
<template>
  <div
    :id="item.value"
    class="list-item"
    :class="classes"
    :draggable="draggable"
    :contenteditable="editable ? 'plaintext-only' : 'false'"
    @dragstart="handlers.start"
    @dragenter="handlers.enter"
    @dragleave="handlers.leave"
    @dragover="handlers.over"
    @drop="handlers.drop"
    @dragend="handlers.end"
    @blur="handleBlur"
  >
    <div class="list-item-content" :class="{ inactive: item.inactive }">
      {{ item.text }}
    </div>
  </div>
</template>
<style scoped>
.list-item {
  --list-item-drag-border-color: var(--color-neutral-40);
}

.list-item {
  padding-block: var(--size-15);
  display: flex;
  flex-grow: 1;
  border: var(--border-size-20) solid transparent;
}

.list-item:hover,
.list-item:focus-within,
.list-item.over {
  background-color: var(--background-color-highlight);
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

.list-item-content {
  flex-grow: 1;
  padding-inline-start: var(--size-15);
  /* so dragenter and dragleave only fires at the list-item element */
  pointer-events: none;
}

.list-item-content.inactive {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}
</style>
