<script setup>
import { toRef } from "vue";
import { hasElements, ActionsMenu } from "@lib";
import { COLLAPSE_STATUSES } from "./collapse-statuses";
import CollapseSymbol from "./collapse-symbol.vue";
import { useCollapseStatus } from "./use-collapse-status";
import { useDrag } from "./use-drag";

const props = defineProps({
  item: { type: Object, default: () => ({}) },
  draggable: { type: Boolean, default: false },
});
const emit = defineEmits(["action", "drag"]);

const collapseStatus = useCollapseStatus(toRef(props, "item"));

const { handleStart, handleOver, handleDrop } = useDrag({
  collapseStatus,
  value: props.item.value,
  emit,
});
</script>
<template>
  <div
    :id="item.value"
    :draggable="draggable"
    @dragstart="handleStart"
    @dragover="handleOver"
    @drop="handleDrop"
  >
    <div class="list-item-cover">
      <collapse-symbol v-model="collapseStatus" />
      <div class="list-base-content" :class="{ inactive: item.inactive }">
        {{ item.text }}
      </div>
      <template v-if="hasElements(item.actions)">
        <div class="list-base-actions">
          <actions-menu
            :actions="item.actions"
            @action="$emit('action', { action: $event, item: item.value })"
          />
        </div>
      </template>
    </div>
    <template v-if="collapseStatus === COLLAPSE_STATUSES.OPEN">
      <div class="list-item-children">
        <template v-for="child in item.children" :key="child.id">
          <list-item
            :item="child"
            :draggable="draggable"
            @action="$emit('action', $event)"
          />
        </template>
      </div>
    </template>
  </div>
</template>
<style scoped>
.list-item-cover {
  padding-block: var(--size-10);
  display: flex;
}

.list-item-cover:hover {
  background-color: var(--color-neutral-60);
}

.list-item-cover:focus-within {
  background-color: var(--color-neutral-50);
}

.list-base-content {
  flex-grow: 1;
  padding-inline-start: var(--size-00);
}

.list-base-content.inactive {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}

.list-base-actions {
  display: flex;
  gap: var(--size-00);
}

.list-item-children {
  padding-inline-start: var(--size-20);
}
</style>
