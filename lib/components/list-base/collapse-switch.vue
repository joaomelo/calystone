<script setup>
import { computed } from "vue";
import { COLLAPSE_STATUSES } from "./collapse";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const char = computed(() =>
  props.modelValue === COLLAPSE_STATUSES.FLAT
    ? "•"
    : props.modelValue === COLLAPSE_STATUSES.OPEN
    ? "▼"
    : "►"
);
const collapsable = computed(() => props.modelValue !== COLLAPSE_STATUSES.FLAT);

const handleClick = () => {
  if (props.modelValue === COLLAPSE_STATUSES.FLAT) return;
  const newValue =
    props.modelValue === COLLAPSE_STATUSES.OPEN
      ? COLLAPSE_STATUSES.CLOSED
      : COLLAPSE_STATUSES.OPEN;
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
