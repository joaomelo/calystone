<script setup>
import { onMounted, ref, toValue, watch } from "vue";

import { place } from "./place";

const props = defineProps({
  anchor: {
    required: true,
    type: String,
  },
  block: {
    default: "center",
    type: String,
  },
  inline: {
    default: "center",
    type: String,
  },
  modelValue: {
    default: false,
    type: Boolean,
  },
});
const emit = defineEmits(["update:modelValue"]);

const popover = ref();
onMounted(() => {
  if (props.modelValue) {
    show();
  }
});
watch(
  () => props.modelValue,
  (modelValue) => {
    if (modelValue) {
      show();
    }
    else {
      popover.value.hidePopover();
    }
  },
);
const handleUpdate = ({ newState }) => {
  const modelValue = newState === "open";
  if (modelValue !== props.modelValue) {
    emit("update:modelValue", modelValue);
  }
};

const show = () => {
  const popoverEl = toValue(popover);
  const anchorEl = document.getElementById(props.anchor);

  popoverEl.showPopover();

  const { left, top } = place({
    anchor: anchorEl,
    block: props.block,
    inline: props.inline,
    popover: popoverEl,
  });

  popoverEl.style.setProperty("--popover-base-top", `${top}px`);
  popoverEl.style.setProperty("--popover-base-left", `${left}px`);
};
</script>
<template>
  <div
    ref="popover"
    class="popover-base"
    popover
    @toggle="handleUpdate"
  >
    <slot />
  </div>
</template>
<style scoped>
.popover-base {
  --popover-base-top: 0;
  --popover-base-left: 0;
  --popover-base-padding: 0;
  --popover-base-font-size: inherit;
  --popover-base-color: inherit;
  --popover-base-border-size: var(--size-00);
  --popover-base-border-style: solid;
  --popover-base-border-color: var(--color-surface-70);
}

.popover-base {
  margin: 0;
  top: var(--popover-base-top);
  left: var(--popover-base-left);
  padding: var(--popover-base-padding);
  border: var(--popover-base-border-size) var(--popover-base-border-style) var(--popover-base-border-color);
  color: var(--popover-base-color);
  font-size: var(--popover-base-font-size);
  /* respects line breaks inside the slot. important for tooltips text */
  white-space: pre-line;
}
</style>
