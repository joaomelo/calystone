<script setup lang="ts">
import { computed, toValue } from "vue";

import { useProvider } from "./provider";

const { disabled = false, icon, id, title } = defineProps<{
  disabled?: boolean
  icon: string
  id: string,
  title: string,
}>();

const provider = useProvider();
const active = computed(() => id === toValue(provider.active));
function handleClick() {
  if (active.value || disabled) return;
  provider["update:active"](id);
}
</script>
<template>
  <li
    v-tooltip="{ value: title, showDelay: 500 }"
    class="side-item"
    :class="{ active, disabled }"
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
