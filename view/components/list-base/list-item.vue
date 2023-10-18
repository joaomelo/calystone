<script setup lang="ts">
import type { CollapseStatus, Item, ItemAction } from "./item";

import { ref, computed, watch } from "vue";
import { hasElements } from "@shared";
import { ActionsMenu } from "../actions-menu";
import CollapseSymbol from "./collapse-symbol.vue";

type Props = {
  item: Item;
};
const props = defineProps<Props>();

type Emits = {
  itemAction: [value: ItemAction];
};
defineEmits<Emits>();

const initialCollapseStatus = computed<CollapseStatus>(() =>
  hasElements(props.item.children) ? "open" : "flat"
);
const collapseStatus = ref(initialCollapseStatus.value);
watch(initialCollapseStatus, (newValue) => (collapseStatus.value = newValue));
</script>
<template>
  <div class="list-base-item">
    <div class="list-base-item-cover">
      <collapse-symbol v-model="collapseStatus" />
      <div class="list-base-content" :class="{ inactive: item.inactive }">
        {{ item.text }}
      </div>
      <div class="list-base-actions">
        <actions-menu
          v-if="item.actions"
          :actions="item.actions"
          @action="$emit('itemAction', { action: $event, item: item.value })"
        />
      </div>
    </div>
    <div v-if="collapseStatus === 'open'" class="list-base-item-children">
      <template v-for="child in item.children" :key="child.id">
        <list-base-item
          :item="child"
          @item-action="$emit('itemAction', $event)"
        />
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

.list-base-content.inactive {
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
