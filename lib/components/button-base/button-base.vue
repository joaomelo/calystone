<script setup>
import { SpinnerBase } from "../spinner-base";

defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "button",
  },
  busy: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button class="button-base" :type="type" :disabled="disabled || busy">
    <div v-if="busy">
      <spinner-base :show="busy" class="button-base-spinner" />
    </div>
    <div class="button-base-content" :class="{ busy }">
      {{ label }}
    </div>
  </button>
</template>
<style scoped>
.button-base {
  position: relative;
  border: var(--border-size-10) solid var(--border-color-standard);
  padding-block: var(--size-15);
  padding-inline: var(--size-20);
}

.button-base-content.busy {
  opacity: 0.1;
}

.button-base-spinner {
  --spinner-base-size: var(--size-30);
  --spinner-base-color: var(--color-neutral-30);
}
</style>
