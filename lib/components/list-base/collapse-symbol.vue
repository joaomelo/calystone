<script setup>
import { computed } from "vue";
import { LIST_ITEM_STATUSES } from "./lista-item-statuses";

const props = defineProps({
  state: {
    type: String,
    required: true,
  },
});

const char = computed(() =>
  props.state === LIST_ITEM_STATUSES.FLAT
    ? "•"
    : props.state === LIST_ITEM_STATUSES.OPEN
    ? "▼"
    : "►"
);

const collapsable = computed(() => props.state !== LIST_ITEM_STATUSES.FLAT);
</script>
<template>
  <div class="collapse-symbol" :class="{ collapsable }">{{ char }}</div>
</template>
<style scoped>
.collapse-symbol {
  width: var(--size-20);
  text-align: center;
}

.collapse-symbol.collapsable:hover {
  cursor: pointer;
}
</style>
