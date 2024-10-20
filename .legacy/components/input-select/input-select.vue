<script setup>
import { vFocus } from "@lib";
import { computed } from "vue";

import { InputWrapper } from "../input-wrapper";
import { asOptions } from "../options";

const props = defineProps({
  autofocus: {
    default: false,
    type: Boolean,
  },
  modelValue: {
    default: null,
    type: String,
  },
  options: {
    default: () => [],
    type: Array,
  },
});
const emit = defineEmits(["update:modelValue"]);

const normalizedOptions = computed(() => asOptions(props.options));
const handleUpdate = event => { emit("update:modelValue", event?.target?.value); };
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
