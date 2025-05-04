<script setup lang="ts">
import { computed, toValue } from "vue";

import { useProvider } from "./provider";

const { disabled = false, icon, id, title } = defineProps<{
  dataTest: string,
  disabled?: boolean
  icon: string
  id: string,
  title: string,
}>();
const emit = defineEmits<{
  click: []
}>();

const provider = useProvider();
const active = computed(() => id === toValue(provider.active));
function handleClick() {
  if (active.value || disabled) return;
  emit("click");
}
</script>
<template>
  <li
    v-tooltip="{ value: title }"
    class="side-item"
    :class="{ active, disabled }"
    :data-test="dataTest"
    @click="handleClick"
  >
    <i
      :class="icon"
      class="side-item-icon"
    />
  </li>
</template>

<style scoped>
.side-item:not(.disabled):not(.active) {
  cursor: pointer;

  &:hover {
    color: var(--p-primary-400);
  }
}

.side-item.active {
  color: var(--p-primary-500);
}

.side-item-icon {
  font-size: var(--font-size-4);
}
</style>
