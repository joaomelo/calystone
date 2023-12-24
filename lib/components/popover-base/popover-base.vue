<script setup>
import { ref, watch, onMounted, toValue } from "vue";
import { place } from "./place";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  anchor: {
    type: String,
    required: true,
  },
  inline: {
    type: String,
    default: "center",
  },
  block: {
    type: String,
    default: "center",
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
    } else {
      popover.value.hidePopover();
    }
  }
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

  const { top, left } = place({
    anchor: anchorEl,
    popover: popoverEl,
    inline: props.inline,
    block: props.block,
  });

  popoverEl.style.setProperty("--popover-base-top", `${top}px`);
  popoverEl.style.setProperty("--popover-base-left", `${left}px`);
};
</script>
<template>
  <div ref="popover" class="popover-base" popover @toggle="handleUpdate">
    <slot></slot>
  </div>
</template>
<style scoped>
.popover-base {
  --popover-base-top: 0;
  --popover-base-left: 0;
  --popover-base-padding: 0;
  --popover-base-font-size: inherit;
  --popover-base-color: inherit;
  --popover-base-border-size: var(--border-size-10);
  --popover-base-border-style: solid;
  --popover-base-border-color: var(--border-color-standard);
}

.popover-base {
  margin: 0;
  top: var(--popover-base-top);
  left: var(--popover-base-left);
  padding: var(--popover-base-padding);
  border: var(--popover-base-border-size) var(--popover-base-border-style)
    var(--popover-base-border-color);
  color: var(--popover-base-color);
  font-size: var(--popover-base-font-size);
  /* respects line breaks inside the slot. important for tooltips text */
  white-space: pre-line;
}
</style>
