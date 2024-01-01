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
    <template #default="{ id }">
      <input
        :id="id"
        v-focus="autofocus"
        :value="modelValue"
        class="input-base-text"
        :type="type"
        @input="handleUpdate"
      />
    </template>
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
