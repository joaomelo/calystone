<script setup>
import { computed } from "vue";
import { asCss } from "../../utils";
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "--size-40",
  },
  color: {
    type: String,
    default: "--color-50",
  },
});

const sizeValue = computed(() => asCss(props.size));
const colorValue = computed(() => asCss(props.color));
</script>
<template>
  <div class="spinner-base-container">
    <div class="spinner-base-shape"></div>
  </div>
</template>
<style scoped>
.spinner-base-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.spinner-base-shape {
  width: v-bind(sizeValue);
  height: v-bind(sizeValue);
  border: var(--size-00) solid v-bind(colorValue);
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
