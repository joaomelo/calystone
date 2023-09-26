<script setup>
import { computed } from "vue";
import { LIST_ITEM_STATUSES } from "./lista-item-statuses";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);

const char = computed(() =>
  props.modelValue === LIST_ITEM_STATUSES.FLAT
    ? "•"
    : props.modelValue === LIST_ITEM_STATUSES.OPEN
    ? "▼"
    : "►"
);

const collapsable = computed(
  () => props.modelValue !== LIST_ITEM_STATUSES.FLAT
);

const handleClick = () => {
  if (props.modelValue === LIST_ITEM_STATUSES.FLAT) return;
  const newValue =
    props.modelValue === LIST_ITEM_STATUSES.OPEN
      ? LIST_ITEM_STATUSES.CLOSED
      : LIST_ITEM_STATUSES.OPEN;
  emit("update:modelValue", newValue);
};
</script>
<template>
  <div class="collapse-symbol" :class="{ collapsable }" @click="handleClick">
    {{ char }}
  </div>
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
