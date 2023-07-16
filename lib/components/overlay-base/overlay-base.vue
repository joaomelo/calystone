<script setup>
import { SpinnerBase } from "../spinner-base";

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  spinnerSize: {
    type: String,
    default: "--size-40",
  },
  spinnerColor: {
    type: String,
    default: "--color-neutral-50",
  },
});
</script>
<template>
  <div class="overlay-base-container">
    <slot></slot>
    <template v-if="show">
      <div class="overlay-base-film">
        <spinner-base :show="show" :size="spinnerSize" :color="spinnerColor" />
      </div>
    </template>
  </div>
</template>
<style scoped>
.overlay-base-container {
  position: relative;
}

.overlay-base-film {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-neutral-10);
  opacity: 0.1;
}
</style>
