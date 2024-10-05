<script setup lang="ts">
import { computed } from "vue";

import { provideProvider } from "./provider";

const { active } = defineProps<{
  active: string
}>();
const emit = defineEmits<{
  "update:active": [active: string]
}>();

const reactiveActive = computed(() => active);

provideProvider({
  active: reactiveActive,
  "update:active": (value: string) => { emit("update:active", value); }
});
</script>
<template>
  <aside class="side-bar">
    <ul class="side-bar-items">
      <slot name="default" />
    </ul>
    <ul class="side-bar-items">
      <slot name="bottom" />
    </ul>
  </aside>
</template>
<style scoped>
.side-bar {
  border-right: var(--border-size-1) solid var(--p-surface-100);

  padding-block: var(--size-4);
  padding-inline: var(--size-3);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.side-bar-items {
  display: flex;
  flex-direction: column;
  gap: var(--size-5);
}
</style>
