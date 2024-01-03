<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { PopoverBase } from "../popover-base";

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  anchor: {
    type: String,
    required: true,
  },
});

const show = ref(false);

let timeoutId;
const handleShow = () => {
  timeoutId = setTimeout(() => (show.value = true), 200);
};
const handleHide = () => {
  clearTimeout(timeoutId);
  show.value = false;
};

onMounted(() => {
  const anchorEl = document.getElementById(props.anchor);
  if (anchorEl) {
    anchorEl.addEventListener("mouseenter", handleShow);
    anchorEl.addEventListener("mouseleave", handleHide);
  }
});

onUnmounted(() => {
  const anchorEl = document.getElementById(props.anchor);
  if (anchorEl) {
    anchorEl.removeEventListener("mouseenter", handleShow);
    anchorEl.removeEventListener("mouseleave", handleHide);
  }
});
</script>
<template>
  <popover-base v-model="show" :anchor="anchor" block="start" class="tooltip-base">
    {{ text }}
  </popover-base>
</template>

<style scoped>
.tooltip-base {
  --popover-base-font-size: var(--font-size-10);
  --popover-base-color: var(--color-content-30);
  --popover-base-border-style: dashed;
  --popover-base-padding: var(--size-20);
}
</style>
