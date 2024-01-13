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
    default: () => [],
    type: Array,
  },
  options: {
    default: () => [],
    type: Array,
  },
  rows: {
    default: "5",
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);

const normalizedOptions = computed(() => asOptions(props.options));

const value = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

</script>
<template>
  <input-wrapper>
    <select
      v-model="value"
      v-focus="autofocus"
      class="input-multiselect"
      multiple
      :size="rows"
    >
      <option
        v-for="option in normalizedOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </input-wrapper>
</template>

<style scoped>
.input-multiselect {
  width: 100%;
  border: var(--input-border);
}

.input-multiselect:focus-within,
.input-multiselect:focus-visible {
  outline: var(--input-outline-focus);
}
</style>
