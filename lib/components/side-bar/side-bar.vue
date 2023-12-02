<script setup>
import { ref, computed, watch } from "vue";
import { ButtonIcon } from "../button-icon";

const props = defineProps({
  modelValue: { type: String, required: true },
  title: { type: String, default: null },
});
const emit = defineEmits(["update:modelValue"]);

const sideBar = ref();

const popover = computed(() =>
  props.modelValue !== "fixed" ? "manual" : undefined
);

watch(
  () => props.modelValue,
  (value) => {
    if (value === "fixed") return;
    if (value === "open") {
      sideBar.value.showPopover();
    } else {
      sideBar.value.hidePopover();
    }
  },
  {
    flush: "post",
  }
);

const handleClick = () => emit("update:modelValue", "closed");
</script>
<template>
  <aside ref="sideBar" :popover="popover" class="side-bar">
    <div class="side-bar-container">
      <div class="side-bar-header">
        <h1 class="side-bar-title">{{ title }}</h1>
        <button-icon
          v-if="modelValue === 'open'"
          icon="close"
          @click="handleClick"
        />
      </div>
      <slot />
    </div>
  </aside>
</template>
<style scoped>
.side-bar-container {
  display: flex;
  flex-direction: column;
  gap: var(--size-40);
}

/* .side-bar.open {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: var(--color-neutral-70);

  padding-top: var(--size-30);
} */

.side-bar-header {
  display: flex;
  gap: var(--size-30);
}

.side-bar-title {
  font-size: var(--font-size-30);
  font-weight: var(--font-weight-40);
}
</style>
