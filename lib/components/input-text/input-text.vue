<script setup>
import { InputWrapper } from "../input-wrapper";

defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(["update:modelValue"]);
const handleUpdate = (event) => emit("update:modelValue", event?.target?.value);
</script>
<template>
  <input-wrapper>
    <input :value="modelValue" class="input-base-text" @input="handleUpdate" />
  </input-wrapper>
</template>

<style scoped>
.input-base-text {
  width: 100%;
  border: var(--input-border);
}

.input-base-text:focus-within,
.input-base-text:focus-visible {
  outline: var(--input-outline-focus);
}
</style>
