<script setup>
import { computed } from "vue";

import { ButtonVeil } from "../button-veil";
import { VisualIcon } from "../visual-icon";

const props = defineProps({
  modelValue: { type: String, required: true },
});
const emit = defineEmits(["update:modelValue"]);

const icon = computed(() => (props.modelValue === "open" ? "close" : "menu"));
const handleToggle = () =>
  emit("update:modelValue", props.modelValue === "open" ? "closed" : "open");
</script>
<template>
  <button-veil @click="handleToggle">
    <visual-icon :name="icon" />
  </button-veil>
</template>
