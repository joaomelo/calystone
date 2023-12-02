<script setup>
import { computed } from "vue";
import { ButtonIcon } from "../button-icon";

const props = defineProps({
  modelValue: { type: String, required: true },
});
const emit = defineEmits(["update:modelValue"]);

const icon = computed(() => (props.modelValue === "open" ? "close" : "menu"));
const handleToggle = () =>
  emit("update:modelValue", props.modelValue === "open" ? "closed" : "open");
</script>
<template>
  <button-icon :icon="icon" @click="handleToggle" />
</template>
