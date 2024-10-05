<script setup lang="ts">
import { computed, toValue } from "vue";

import { useProvider } from "./provider";


const { icon, id, title } = defineProps<{
  icon: string
  id: string,
  title: string,
}>();

const iconClass = computed(() => `pi pi-${icon}`);

const provider = useProvider();
const isActive = computed(() => id === toValue(provider.active));
function handleClick() {
  if (isActive.value) return;
  provider["update:active"](id);
}
</script>
<template>
  <li
    v-tooltip="{ value: title, showDelay: 500 }"
    class="side-item"
    :class="{ active: isActive }"
    @click="handleClick"
  >
    <i
      :class="iconClass"
      class="side-item-icon"
    />
  </li>
</template>

<style scoped>
.side-item {
  cursor: pointer;
}

.side-item:hover {
  color: var(--p-primary-400);
}

.side-item.active {
  color: var(--p-primary-500);
}

.side-item-icon {
  font-size: var(--font-size-4);
}
</style>
