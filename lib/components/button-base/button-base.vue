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
  label: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <button class="button-base" :type="type">
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
