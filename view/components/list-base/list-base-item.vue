<script setup>
import { ref, computed, watch } from "vue";
import { hasElements } from "@shared";
import { ActionsMenu } from "../actions-menu";
import { LIST_ITEM_STATUSES } from "./lista-item-statuses";
import CollapseSymbol from "./collapse-symbol.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
defineEmits(["action"]);

const initialState = computed(() =>
  hasElements(props.item.children)
    ? LIST_ITEM_STATUSES.OPEN
    : LIST_ITEM_STATUSES.FLAT
);
const state = ref(initialState.value);
watch(initialState, (newValue) => (state.value = newValue));
</script>
<template>
  <div class="list-base-item">
    <div class="list-base-item-cover">
      <collapse-symbol v-model="state" />
      <div class="list-base-content" :class="{ closed: item.closed }">
        {{ item.title }}
      </div>
      <div class="list-base-actions">
        <actions-menu
          :actions="item.actions"
          @action="$emit('action', { action: $event, item })"
        />
      </div>
    </div>
    <div
      v-if="state === LIST_ITEM_STATUSES.OPEN"
      class="list-base-item-children"
    >
      <template v-for="child in item.children" :key="child.id">
        <list-base-item :item="child" @action="$emit('action', $event)" />
      </template>
    </div>
  </div>
</template>
<style scoped>
.list-base-item-cover {
  padding-block: var(--size-10);
  display: flex;
}

.list-base-item-cover:hover {
  background-color: var(--color-neutral-60);
}

.list-base-item-cover:focus-within {
  background-color: var(--color-neutral-50);
}

.list-base-content {
  flex-grow: 1;
  padding-inline-start: var(--size-00);
}

.list-base-content.closed {
  color: var(--color-neutral-40);
  text-decoration: line-through;
}

.list-base-actions {
  display: flex;
  gap: var(--size-00);
}

.list-base-item-children {
  padding-inline-start: var(--size-20);
}
</style>
