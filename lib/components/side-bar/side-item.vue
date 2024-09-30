<script setup lang="ts">
import { computed } from "vue";

interface Props {
  active?: boolean,
  icon: string
  tooltip?: string,
}

const { icon, tooltip } = defineProps<Props>();

const iconClass = computed(() => `pi pi-${icon}`);
</script>
<template>
  <li
    v-tooltip="{ value: tooltip, showDelay: 500 }"
    class="side-item"
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
</style>
