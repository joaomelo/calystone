<script setup>
import { computed } from "vue";
import { asOptions } from "../options";

const props = defineProps({
  inline: { type: Boolean, default: false },
  label: { type: String, default: null },
  modelValue: { type: String, default: null },
  options: { type: Array, default: () => [] },
  rows: { type: String, default: "5" },
  type: { type: String, default: "text" },
});
const emit = defineEmits(["update:modelValue"]);

const normalizedOptions = computed(() => asOptions(props.options));
const handleUpdate = (event) => emit("update:modelValue", event?.target?.value);
</script>
<template>
  <div class="input-base" :class="{ inline }">
    <label v-if="label" class="input-base-label">{{ label }}</label>
    <template v-if="type === 'textarea'">
      <textarea
        :value="modelValue"
        class="input-base-input text-area"
        :rows="rows"
        @input="handleUpdate"
      ></textarea>
    </template>
    <template v-else-if="type === 'select'">
      <select
        :value="modelValue"
        class="input-base-input select"
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
    </template>
    <template v-else>
      <input
        :type="type"
        :value="modelValue"
        class="input-base-input text"
        @input="handleUpdate"
      />
    </template>
  </div>
</template>

<style scoped>
.input-base {
  width: 100%;
  font-family: inherit;
}

.input-base.inline {
  display: inline;
}

.input-base-label {
  display: block;
  margin-bottom: var(--size-00);
}

.input-base-input {
  width: 100%;
  display: block;
  margin: 0;
}

.inline .input-base-input {
  display: inline;
  width: max-content;
}

.input-base-input.text-area {
  resize: none;
}
</style>
