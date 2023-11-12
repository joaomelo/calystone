<script setup lang="ts">
import type { CollapseStatus } from "./item";

import { computed } from "vue";

type Props = {
  modelValue: CollapseStatus;
};
const props = defineProps<Props>();

type Emits = {
  "update:modelValue": [status: CollapseStatus];
};
const emit = defineEmits<Emits>();

const char = computed(() =>
  props.modelValue === "flat" ? "•" : props.modelValue === "open" ? "▼" : "►"
);
const collapsable = computed(() => props.modelValue !== "flat");

const handleClick = () => {
  if (props.modelValue === "flat") return;
  const newValue: CollapseStatus =
    props.modelValue === "open" ? "closed" : "open";
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
