<script setup>
import { InputWrapper } from "../input-wrapper";

defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
});
const emit = defineEmits(["update:modelValue"]);
const handleUpdate = (event) => emit("update:modelValue", event?.target?.value);
</script>
<template>
  <input-wrapper>
    <input
      :value="modelValue"
      class="input-base-text"
      :autofocus="autofocus"
      :type="type"
      @input="handleUpdate"
    />
  </input-wrapper>
</template>

<style scoped>
.input-base-text {
  width: 100%;
  border: var(--input-border);
  padding-block: var(--size-10);
  padding-inline: var(--size-20);
}

.input-base-text:focus-within,
.input-base-text:focus-visible {
  outline: var(--input-outline-focus);
}
</style>
