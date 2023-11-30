<script setup>
defineProps({
  show: { type: Boolean, default: false },
});
</script>
<template>
  <div v-if="show" class="spinner-base">
    <div class="spinner-base-shape"></div>
  </div>
</template>
<style scoped>
.spinner-base {
  --spinner-base-size: var(--size-40);
  --spinner-base-color: var(--color-neutral-50);
}

.spinner-base {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.spinner-base-shape {
  width: var(--spinner-base-size);
  height: var(--spinner-base-size);
  border: var(--size-10) solid var(--spinner-base-color);
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner 1s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(1turn);
  }
}
</style>
