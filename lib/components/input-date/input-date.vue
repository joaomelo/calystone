<script setup>
import { vFocus } from "@lib";
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
});
const emit = defineEmits(["update:modelValue"]);
const handleUpdate = (event) => emit("update:modelValue", event?.target?.value);
</script>
<template>
  <input-wrapper>
    <input
      v-focus="autofocus"
      :value="modelValue"
      class="input-date-input"
      type="date"
      @input="handleUpdate"
    />
  </input-wrapper>
</template>

<style scoped>
.input-date-input {
  width: 100%;
  border: var(--input-border);
  padding-block: var(--size-10);
  padding-inline: var(--size-20);
}

.input-date-input:focus-within,
.input-date-input:focus-visible {
  outline: var(--input-outline-focus);
}
</style>
