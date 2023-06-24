<script setup>
import { SpinnerBase } from "../spinner-base";
defineProps({
  busy: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button class="button-base">
    <div class="button-base-spinner" v-if="busy">
      <spinner-base :show="busy" size="--size-20" color="--color-neutral-30" />
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
</style>
