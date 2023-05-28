<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="overlay-base-container">
    <slot></slot>
    <template v-if="show">
      <div class="overlay-base-film">
        <div class="overlay-base-spinner-container">
          <div class="overlay-base-spinner"></div>
        </div>
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
  background-color: var(--color-10);
  opacity: 0.1;
}

.overlay-base-spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.overlay-base-spinner {
  width: var(--size-40);
  height: var(--size-40);
  border: var(--size-00) solid var(--color-50);
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
