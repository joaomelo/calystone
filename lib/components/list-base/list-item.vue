<script setup>
import { ref, computed, watch } from "vue";
import { hasElements, ActionsMenu } from "@lib";
import { COLLAPSE_STATUSES } from "./collapse-statuses";
import CollapseSymbol from "./collapse-symbol.vue";

const props = defineProps({
  item: { type: Object, default: () => ({}) },
});
defineEmits(["action"]);

const initialCollapseStatus = computed(() =>
  hasElements(props.item.children)
    ? COLLAPSE_STATUSES.OPEN
    : COLLAPSE_STATUSES.FLAT
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
      <div class="list-base-item-children">
        <template v-for="child in item.children" :key="child.id">
          <list-item :item="child" @action="$emit('action', $event)" />
        </template>
      </div>
    </template>
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
