<script setup>
import { SpinnerBase } from "../spinner-base";
defineProps({
  busy: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
});
</script>
<template>
  <button class="button-base" :type="type">
    <div v-if="busy">
      <spinner-base :show="busy" class="button-base-spinner" />
    </div>
    <div class="button-base-content" :class="{ busy }">
      <slot></slot>
    </div>
  </button>
</template>
<style scoped>
.button-base {
  position: relative;
}

.button-base-content.busy {
  opacity: 0.1;
}

.button-base-spinner {
  --spinner-base-size: var(--size-20);
  --spinner-base-color: var(--color-neutral-30);
}
</style>
