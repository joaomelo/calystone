<script setup>
import { computed } from "vue";
import { TooltipBase } from "../tooltip-base";
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

const { handlers, dragClasses } = useDrag({ value: props.item.value, emit });

const classes = computed(() => ({
  ...dragClasses,
  inactive: props.item.inactive,
}));

const handleBlur = (e) => {
  const text = e.target.textContent;
  if (text === props.item.text) return;
  emit("edit", { item: props.item.value, text });
};
const handleEnter = (e) => e.target.blur();
</script>
<template>
  <div
    v-bind="$attrs"
    :id="item.value"
    class="list-item"
    :class="classes"
    :draggable="draggable"
    @dragstart="handlers.start"
    @dragenter="handlers.enter"
    @dragleave="handlers.leave"
    @dragover="handlers.over"
    @drop="handlers.drop"
    @dragend="handlers.end"
  >
    <span
      :contenteditable="editable ? 'plaintext-only' : 'false'"
      class="list-item-content"
      @blur="handleBlur"
      @keydown.enter.prevent="handleEnter"
    >
      {{ item.text }}
    </span>
    <span><slot name="side" v-bind="item"></slot></span>
  </div>
  <tooltip-base v-if="item.tooltip" :anchor="item.value" :text="item.tooltip" />
</template>
<style scoped>
.list-item {
  --list-item-drag-border-color: var(--color-neutral-40);
}

.list-item {
  display: flex;
  flex-grow: 1;
  padding-block: var(--size-15);
  padding-inline-start: var(--size-10);
  border: var(--border-size-20) solid transparent;
}

.list-item.inactive {
  color: var(--color-neutral-40);
  text-decoration: line-through;
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
  outline: none;
}
</style>
