<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { ButtonIcon } from "../button-icon";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
    validator: (value) => ["fixed", "open", "closed"].includes(value),
  },
  title: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(["update:modelValue"]);

const popover = computed(() =>
  props.modelValue === "fixed" ? undefined : "auto"
);

const sideBar = ref();
onMounted(() => {
  sideBar.value.ontoggle = ({ newState }) => {
    if (newState !== props.modelValue) {
      emit("update:modelValue", newState);
    }
  };
});
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
          class="side-bar-close"
          @click="handleClick"
        />
      </div>
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
  padding-inline-start: var(--size-30);
  padding-inline-end: var(--size-45);
}

.side-bar::backdrop {
  background-color: var(--color-neutral-10);
  opacity: 0.2;
}

.side-bar-container {
  display: flex;
  flex-direction: column;
  gap: var(--size-40);
}

.side-bar-header {
  display: flex;
  gap: var(--size-30);
}

.side-bar-title {
  font-size: var(--font-size-15);
  font-weight: var(--font-weight-40);
}

.side-bar-close {
  position: absolute;
  top: var(--size-05);
  right: var(--size-05);
}
</style>
