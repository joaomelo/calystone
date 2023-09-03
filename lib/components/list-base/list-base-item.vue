<script setup>
import { ref } from "vue";
import { hasElements } from "@lib";
import { LIST_ITEM_STATUSES } from "./lista-item-statuses";
import CollapseSymbol from "./collapse-symbol.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const state = ref(
  hasElements(props.item.children)
    ? LIST_ITEM_STATUSES.OPEN
    : LIST_ITEM_STATUSES.FLAT
);
const toggleChildren = () => {
  if (state.value === LIST_ITEM_STATUSES.FLAT) return;
  state.value =
    state.value === LIST_ITEM_STATUSES.OPEN
      ? LIST_ITEM_STATUSES.CLOSED
      : LIST_ITEM_STATUSES.OPEN;
};
</script>
<template>
  <div class="list-base-item">
    <div class="list-base-item-cover" @click="toggleChildren">
      <collapse-symbol :state="state" />
      <div class="list-base-content">{{ item.title }}</div>
      <div class="list-base-aside">
        <slot name="aside" :item="item"></slot>
      </div>
    </div>
    <div
      v-if="state === LIST_ITEM_STATUSES.OPEN"
      class="list-base-item-children"
    >
      <template v-for="child in item.children" :key="child.id">
        <list-base-item :item="child" />
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

.list-base-aside {
  display: flex;
  gap: var(--size-00);
}

.list-base-item-children {
  padding-inline-start: var(--size-20);
}
</style>
