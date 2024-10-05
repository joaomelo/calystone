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
function handleClick() {
  provider["update:active"](id);
}
</script>
<template>
  <li
    v-tooltip="{ value: title, showDelay: 500 }"
    class="side-item"
    :class="{ active: toValue(provider.active) === id }"
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
  background-color: var(--color-surface-30);
}

.side-item.active {
  text-decoration: underline;
}

.side-item-icon {
  font-size: var(--font-size-4);
}

.side-item.active {
  color: goldenrod;
}
</style>
