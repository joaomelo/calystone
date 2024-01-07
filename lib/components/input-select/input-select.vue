<script setup>
import { computed } from "vue";
import { vFocus } from "@lib";

import { asOptions } from "../options";
import { InputWrapper } from "../input-wrapper";

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);

const normalizedOptions = computed(() => asOptions(props.options));
const handleUpdate = event => emit("update:modelValue", event?.target?.value);
</script>
<template>
  <input-wrapper>
    <select
      v-focus="autofocus"
      :value="modelValue"
      class="input-base-select"
      @input="handleUpdate"
    >
      <option
        v-for="option in normalizedOptions"
        :key="option.value"
        :value="option.value"
        :disabled="option.inactive"
      >
        {{ option.text }}
      </option>
    </select>
  </input-wrapper>
</template>

<style scoped>
.input-base-select {
  width: 100%;
  border: var(--input-border);
  padding-block: var(--size-10);
  padding-inline: var(--size-20);
}

.input-base-select:focus-within,
.input-base-select:focus-visible {
  outline: var(--input-outline-focus);
}
</style>
