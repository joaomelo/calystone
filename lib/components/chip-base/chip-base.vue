<script setup>
import { computed, useAttrs } from "vue";
defineProps({
  text: {
    default: null,
    type: String,
  },
});

const attrs = useAttrs();
const actionable = computed(() => !!attrs.onClick);
</script>

<template>
  <div
    class="chip-base"
    :class="{ actionable}"
  >
    {{ text }}
  </div>
</template>

<style scoped>

.chip-base {
  border: var(--size-00) solid var(--color-surface-40);
  padding-inline: var(--size-05);
  padding-block: var(--size-05);

  font-size: var(--font-size-10);

  background-color: var(--color-surface-20);
}

.chip-base.actionable {
  cursor: pointer;
}

.chip-base.actionable:hover{
  background-color: var(--color-surface-30);
}
</style>
