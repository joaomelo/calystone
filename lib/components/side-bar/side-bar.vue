<script setup>
import { computed, ref, watch } from "vue";
import { ButtonVeil } from "../button-veil";
import { VisualIcon } from "../visual-icon";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    validator: value => ["fixed", "open", "closed"].includes(value),
  },
});
const emit = defineEmits(["update:modelValue"]);

const popover = computed(() => (props.modelValue === "fixed" ? undefined : "auto"));

const sideBar = ref();
const handleToggle = ({ newState }) => {
  if (newState !== props.modelValue) {
    emit("update:modelValue", newState);
  }
};
watch(
  () => props.modelValue,
  (value) => {
    if (value === "fixed") return;
    if (value === "open") {
      sideBar.value.showPopover();
    }
    else {
      sideBar.value.hidePopover();
    }
  },
  {
    flush: "post",
  },
);

const handleClick = () => emit("update:modelValue", "closed");
</script>
<template>
  <aside
    ref="sideBar"
    :popover="popover"
    class="side-bar"
    @toggle="handleToggle"
  >
    <div class="side-bar-container">
      <button-veil
        v-if="modelValue === 'open'"
        class="side-bar-close"
        @click="handleClick"
      >
        <visual-icon
          name="close"
          size="var(--size-30)"
        />
      </button-veil>
      <slot />
    </div>
  </aside>
</template>
<style scoped>
.side-bar {
  margin: 0;
  border: 0;
}

.side-bar:popover-open {
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  padding-block-start: var(--size-20);
  padding-inline: var(--size-30);
}

.side-bar::backdrop {
  background-color: var(--color-surface-70);
  opacity: 0.9;
}

.side-bar-container {
  display: flex;
  flex-direction: column;
  gap: var(--size-35);
}

.side-bar-close {
  position: absolute;
  top: var(--size-05);
  right: var(--size-05);
}
</style>
